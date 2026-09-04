/* ══════════════════════════════════════════════════════════════════
   servidor.js — API del sitio del stand (Express + Postgres)

   ARQUITECTURA SEPARADA. Este proceso NO sirve el sitio: sirve

     ·  /api/*    contenido editable, sesiones y subidas
     ·  /medios/* los archivos que sube la gente
     ·  /salud    healthcheck de Railway

   El sitio estático vive en otro lado (CDN). Ventaja concreta: los
   7 MB de pósters y el video no pasan nunca por Railway, así que no
   consumen ni compute ni egress facturable. Solo lo que se sube
   después sale de acá.

   Dos consecuencias de separar, y las dos están resueltas abajo:

   1. CORS. Hay que declarar explícitamente qué orígenes pueden
      llamar a esta API (ORIGENES_PERMITIDOS). No usamos "*" porque
      esto acepta escrituras.

   2. Sesiones sin cookies. Con dos dominios la cookie de sesión sería
      de tercera parte, y Safari las bloquea. Se usa token Bearer en
      el header Authorization. Ver js/api.js del frontend.

   El frontend sigue funcionando sin este servidor: si /api/contenido
   no responde, usa los datos/*.js del disco.
   ══════════════════════════════════════════════════════════════════ */
"use strict";

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const PUERTO = process.env.PORT || 3000;
const DIR_MEDIOS = process.env.DIR_MEDIOS || path.join(__dirname, "medios");
const CLAVE_HASH = process.env.CLAVE_EDICION_HASH || "";
const HORAS_SESION = Number(process.env.HORAS_SESION || 12);
const MAX_MB = Number(process.env.MAX_SUBIDA_MB || 60);

/* Lista blanca de orígenes. Coma como separador, sin barra final.
   Ej: https://expoisi.com.ar,https://expoisipage.pages.dev,http://localhost:5500 */
const ORIGENES = (process.env.ORIGENES_PERMITIDOS || "")
  .split(",").map(s => s.trim().replace(/\/+$/, "")).filter(Boolean);

if (!ORIGENES.length) {
  console.warn("AVISO: ORIGENES_PERMITIDOS está vacío. Ningún navegador va a poder " +
               "llamar a esta API. Cargá al menos el dominio del frontend.");
}

if (!CLAVE_HASH) {
  console.error("FALTA la variable CLAVE_EDICION_HASH. Generala con: npm run clave");
  process.exit(1);
}

fs.mkdirSync(DIR_MEDIOS, { recursive: true });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "no" ? false : { rejectUnauthorized: false }
});

const app = express();
app.set("trust proxy", 1);
/* ── CORS ───────────────────────────────────────────────────────
   Lista blanca estricta. Con "*" cualquier página de internet podría
   hacer un PUT contra esta API usando el token de un editor logueado.
   Vary: Origin es obligatorio: sin eso, un proxy o CDN puede cachear
   la respuesta de un origen y devolvérsela a otro.                    */
app.use((req, res, next) => {
  const origen = req.headers.origin;
  res.setHeader("Vary", "Origin");
  if (origen && ORIGENES.includes(origen)) {
    res.setHeader("Access-Control-Allow-Origin", origen);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Max-Age", "86400");
  }
  if (req.method === "OPTIONS") {
    /* Preflight de un origen no permitido: 403 en vez de 204, para que
       en la consola se vea que el problema es la lista blanca. */
    return res.sendStatus(origen && ORIGENES.includes(origen) ? 204 : 403);
  }
  next();
});

app.use(express.json({ limit: "8mb" }));

/* ── Autenticación ──────────────────────────────────────────────
   Clave compartida, como pediste: cualquiera que la tenga entra.
   Lo que agregamos es TRAZA: al entrar hay que decir un nombre, y ese
   nombre queda pegado a cada cambio. Con clave compartida y sin traza,
   cuando algo aparece borrado no hay forma de saber quién ni cuándo.  */

async function limpiarSesiones() {
  try { await pool.query("DELETE FROM sesiones WHERE expira_en < now()"); } catch (e) { /* noop */ }
}
setInterval(limpiarSesiones, 30 * 60 * 1000).unref();

function tokenDe(req) {
  const h = req.headers.authorization || "";
  const m = /^Bearer\s+(\S+)$/i.exec(h);
  return m ? m[1] : null;
}

async function sesionDe(req) {
  const t = tokenDe(req);
  if (!t) return null;
  const r = await pool.query(
    "SELECT nombre FROM sesiones WHERE token = $1 AND expira_en > now()", [t]);
  return r.rows[0] || null;
}

async function exigirSesion(req, res, next) {
  const s = await sesionDe(req);
  if (!s) return res.status(401).json({ error: "Sesión no válida. Entrá de nuevo con la clave." });
  req.editor = s.nombre;
  next();
}

/* Freno de fuerza bruta: la clave es una sola y es compartida, así que
   sin esto se prueba un diccionario entero en un rato. */
const intentos = new Map();
function demasiadosIntentos(ip) {
  const e = intentos.get(ip);
  if (!e) return false;
  if (Date.now() - e.desde > 15 * 60 * 1000) { intentos.delete(ip); return false; }
  return e.n >= 10;
}
function sumarIntento(ip) {
  const e = intentos.get(ip) || { n: 0, desde: Date.now() };
  e.n++; intentos.set(ip, e);
}

app.post("/api/sesion", async (req, res) => {
  const ip = req.ip;
  if (demasiadosIntentos(ip)) {
    return res.status(429).json({ error: "Demasiados intentos. Probá en 15 minutos." });
  }
  const { clave, nombre } = req.body || {};
  const quien = String(nombre || "").trim();
  if (quien.length < 3) {
    return res.status(400).json({ error: "Poné tu nombre: queda registrado en cada cambio." });
  }
  const ok = await bcrypt.compare(String(clave || ""), CLAVE_HASH);
  if (!ok) { sumarIntento(ip); return res.status(401).json({ error: "Clave incorrecta." }); }
  intentos.delete(ip);

  const token = crypto.randomBytes(32).toString("hex");
  const expira = new Date(Date.now() + HORAS_SESION * 3600 * 1000);
  await pool.query(
    "INSERT INTO sesiones (token, nombre, expira_en) VALUES ($1,$2,$3)",
    [token, quien.slice(0, 80), expira]);
  /* El token va en el cuerpo, no en una cookie: el frontend está en
     otro dominio y la cookie sería de tercera parte. */
  res.json({ token, nombre: quien, expira_en: expira });
});

app.delete("/api/sesion", async (req, res) => {
  const t = tokenDe(req);
  if (t) await pool.query("DELETE FROM sesiones WHERE token = $1", [t]);
  res.json({ ok: true });
});

app.get("/api/sesion", async (req, res) => {
  const s = await sesionDe(req);
  res.json({ activa: !!s, nombre: s ? s.nombre : null });
});

/* ── Contenido ────────────────────────────────────────────────── */

app.get("/api/contenido", async (_req, res) => {
  const r = await pool.query("SELECT clave, datos, version, actualizado_en, actualizado_por FROM secciones");
  const salida = {};
  r.rows.forEach(f => {
    salida[f.clave] = {
      datos: f.datos, version: f.version,
      actualizado_en: f.actualizado_en, actualizado_por: f.actualizado_por
    };
  });
  res.set("Cache-Control", "no-store");
  res.json(salida);
});

app.get("/api/contenido/:clave", async (req, res) => {
  const r = await pool.query("SELECT * FROM secciones WHERE clave = $1", [req.params.clave]);
  if (!r.rows.length) return res.status(404).json({ error: "Sección no encontrada." });
  res.set("Cache-Control", "no-store");
  res.json(r.rows[0]);
});

/* Guardado con control de concurrencia optimista.
   El cliente manda la versión que tenía cuando abrió la página. Si en el
   medio otro guardó, devolvemos 409 y el navegador avisa en vez de pisar
   el trabajo ajeno. Con varias personas cargando contenido a la vez esto
   no es opcional. */
app.put("/api/contenido/:clave", exigirSesion, async (req, res) => {
  const clave = req.params.clave;
  const { datos, version } = req.body || {};
  if (!datos || typeof datos !== "object") {
    return res.status(400).json({ error: "Falta el objeto 'datos'." });
  }
  const cli = await pool.connect();
  try {
    await cli.query("BEGIN");
    const act = await cli.query("SELECT datos, version FROM secciones WHERE clave = $1 FOR UPDATE", [clave]);

    if (!act.rows.length) {
      const ins = await cli.query(
        "INSERT INTO secciones (clave, datos, version, actualizado_por) VALUES ($1,$2,1,$3) RETURNING version",
        [clave, datos, req.editor]);
      await cli.query("COMMIT");
      return res.json({ version: ins.rows[0].version, creada: true });
    }

    const actual = act.rows[0];
    if (version != null && Number(version) !== actual.version) {
      await cli.query("ROLLBACK");
      return res.status(409).json({
        error: "Otra persona guardó cambios mientras editabas.",
        version_servidor: actual.version
      });
    }

    await cli.query(
      "INSERT INTO secciones_historial (clave, datos, version, guardado_por) VALUES ($1,$2,$3,$4)",
      [clave, actual.datos, actual.version, req.editor]);

    const upd = await cli.query(
      `UPDATE secciones SET datos = $2, version = version + 1,
              actualizado_en = now(), actualizado_por = $3
       WHERE clave = $1 RETURNING version`,
      [clave, datos, req.editor]);

    await cli.query("COMMIT");
    res.json({ version: upd.rows[0].version });
  } catch (e) {
    await cli.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ error: "No se pudo guardar." });
  } finally {
    cli.release();
  }
});

app.get("/api/historial/:clave", exigirSesion, async (req, res) => {
  const r = await pool.query(
    `SELECT id, version, guardado_en, guardado_por
       FROM secciones_historial WHERE clave = $1
      ORDER BY version DESC LIMIT 50`, [req.params.clave]);
  res.json(r.rows);
});

app.post("/api/revertir/:clave/:version", exigirSesion, async (req, res) => {
  const { clave, version } = req.params;
  const h = await pool.query(
    "SELECT datos FROM secciones_historial WHERE clave = $1 AND version = $2", [clave, version]);
  if (!h.rows.length) return res.status(404).json({ error: "Esa versión no existe." });
  const act = await pool.query("SELECT datos, version FROM secciones WHERE clave = $1", [clave]);
  await pool.query(
    "INSERT INTO secciones_historial (clave, datos, version, guardado_por) VALUES ($1,$2,$3,$4)",
    [clave, act.rows[0].datos, act.rows[0].version, req.editor + " (antes de revertir)"]);
  const upd = await pool.query(
    `UPDATE secciones SET datos = $2, version = version + 1, actualizado_en = now(), actualizado_por = $3
     WHERE clave = $1 RETURNING version`, [clave, h.rows[0].datos, req.editor]);
  res.json({ version: upd.rows[0].version });
});

/* ── Subida de imágenes y video ─────────────────────────────────
   Los binarios van al disco (volumen de Railway), NO a Postgres.
   Meter un mp4 de 7 MB en una columna bytea hace que cada backup de la
   base pese lo mismo que la carpeta de videos, y las consultas de
   contenido arrastren el binario sin necesidad.                      */

const almacen = multer.diskStorage({
  destination: (_r, _f, cb) => cb(null, DIR_MEDIOS),
  filename: (_r, file, cb) => {
    const ext = (path.extname(file.originalname) || "").toLowerCase().slice(0, 8);
    const base = path.basename(file.originalname, path.extname(file.originalname))
      .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "archivo";
    cb(null, `${base}-${Date.now().toString(36)}${ext}`);
  }
});

/* Validamos por EXTENSIÓN, no por el mimetype que manda el cliente.
   Motivo: el mimetype lo declara quien sube y se puede mentir; además
   navegadores y herramientas mandan application/octet-stream para
   formatos que no conocen (curl con .webp, por ejemplo) y rechazaríamos
   archivos legítimos. La extensión, en cambio, la controlamos nosotros
   al renombrar, y es la que decide con qué Content-Type se sirve. */
const EXT_OK = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".gif": "image/gif", ".avif": "image/avif",
  ".mp4": "video/mp4", ".webm": "video/webm", ".pdf": "application/pdf"
};

function errorTipo(msg) {
  const e = new Error(msg);
  e.status = 415;
  return e;
}

const subir = multer({
  storage: almacen,
  limits: { fileSize: MAX_MB * 1024 * 1024, files: 12 },
  fileFilter: (_r, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    if (!EXT_OK[ext]) {
      return cb(errorTipo(
        'No se admite "' + (file.originalname || "el archivo") + '". ' +
        "Formatos válidos: " + Object.keys(EXT_OK).join(" ") + "."));
    }
    cb(null, true);
  }
});

/* Las URLs de medios se devuelven ABSOLUTAS. Se guardan tal cual en el
   contenido, y ese contenido lo consume un frontend que vive en otro
   dominio: una ruta relativa como /medios/x.webp apuntaría al CDN, que
   no tiene ese archivo. */
function basePublica(req) {
  if (process.env.URL_PUBLICA) return process.env.URL_PUBLICA.replace(/\/+$/, "");
  return req.protocol + "://" + req.get("host");
}

app.post("/api/medios", exigirSesion, subir.array("archivos", 12), async (req, res) => {
  const base = basePublica(req);
  const salida = [];
  for (const f of req.files || []) {
    await pool.query(
      "INSERT INTO medios (nombre, nombre_orig, tipo, bytes, subido_por) VALUES ($1,$2,$3,$4,$5)",
      [f.filename, f.originalname, EXT_OK[path.extname(f.filename).toLowerCase()], f.size, req.editor]);
    salida.push({
      url: base + "/medios/" + f.filename,
      tipo: EXT_OK[path.extname(f.filename).toLowerCase()],
      bytes: f.size
    });
  }
  res.json({ archivos: salida });
});

app.get("/api/medios", exigirSesion, async (req, res) => {
  const r = await pool.query("SELECT nombre, tipo, bytes, subido_en, subido_por FROM medios ORDER BY subido_en DESC LIMIT 300");
  const base = basePublica(req);
  res.json(r.rows.map(m => Object.assign({ url: base + "/medios/" + m.nombre }, m)));
});

/* Los medios se cachean fuerte: el nombre lleva timestamp, así que un
   archivo nunca cambia de contenido con el mismo nombre. */
/* Los medios los pide un <img> o un <video> desde el otro dominio.
   Para eso alcanza con Allow-Origin abierto: son archivos públicos de
   lectura, sin token de por medio, y limitarlos a la lista blanca
   rompería el sitio si algún día se sirve desde otra URL. */
app.use("/medios", express.static(DIR_MEDIOS, {
  maxAge: "30d", immutable: true, fallthrough: true,
  setHeaders(res, ruta) {
    const t = EXT_OK[path.extname(ruta).toLowerCase()];
    if (t) res.setHeader("Content-Type", t);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
}));

/* Este proceso NO sirve el sitio. Si alguien entra a la raíz de la API
   por error, que sepa dónde está parado en vez de comerse un 404 seco. */
app.get("/", (_req, res) => res.json({
  servicio: "API del stand de Sistemas · Expo UTN 2026",
  sitio: ORIGENES[0] || null,
  endpoints: ["/api/contenido", "/api/sesion", "/api/medios", "/salud"]
}));

app.get("/salud", async (_req, res) => {
  try { await pool.query("SELECT 1"); res.json({ ok: true }); }
  catch { res.status(503).json({ ok: false }); }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err && err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: `El archivo supera ${MAX_MB} MB.` });
  }
  res.status(err && err.status ? err.status : 500)
     .json({ error: err.message || "Error interno." });
});

app.listen(PUERTO, () => console.log("Escuchando en :" + PUERTO));
