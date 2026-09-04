/* ══════════════════════════════════════════════════════════════════
   sembrar.js — carga los datos/*.js del repo a Postgres.

   Se corre UNA VEZ, al montar la base. Después de eso la fuente de
   verdad es la base, y los datos/*.js quedan solo como respaldo para
   que el sitio siga abriendo si el servidor está caído.

   Con --forzar pisa lo que haya en la base. Sin eso, solo inserta las
   secciones que todavía no existen (para no borrar lo que cargaron).
   ══════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), { Pool } = require("pg");

const FORZAR = process.argv.includes("--forzar");
const DIR = path.resolve(__dirname, "..", "datos");

/* Qué variables globales define cada archivo de datos. */
const SECCIONES = {
  "plan-estudios":  ["MATERIAS", "TUTORIAS", "APOYO", "LABORATORIOS", "DISCREPANCIAS"],
  "materias":       ["DETALLE_MATERIAS"],
  "salida-laboral": ["NIVELES_DEV", "PERFILES"],
  "incumbencias":   ["RAIZ", "AREAS", "NOTA_LEGAL"],
  "proyectos":      ["PROYECTOS", "INTRO"],
  "vida":           ["TESTIMONIOS", "GRADUACIONES", "ESPACIOS"],
  "investigacion":  ["CONGRESOS", "PAPER", "GRADUADOS", "COOPERACION", "PUBLICACIONES"],
  "electivas":      ["BLOQUES"],
  "links-utiles":   ["BLOQUES"]
};

function leer(archivo, nombres) {
  const ruta = path.join(DIR, archivo + ".js");
  if (!fs.existsSync(ruta)) return null;
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(ruta, "utf8"), ctx, { timeout: 5000 });
  const out = {};
  let hay = false;
  nombres.forEach(n => { if (ctx[n] !== undefined) { out[n] = ctx[n]; hay = true; } });
  return hay ? out : null;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "no" ? false : { rejectUnauthorized: false }
});

(async () => {
  for (const [clave, nombres] of Object.entries(SECCIONES)) {
    const datos = leer(clave, nombres);
    if (!datos) { console.log("—  " + clave + ": sin datos, salteada"); continue; }
    if (FORZAR) {
      await pool.query(
        `INSERT INTO secciones (clave, datos, actualizado_por) VALUES ($1,$2,'siembra')
         ON CONFLICT (clave) DO UPDATE
           SET datos = EXCLUDED.datos, version = secciones.version + 1,
               actualizado_en = now(), actualizado_por = 'siembra'`,
        [clave, datos]);
      console.log("↻  " + clave + " (pisado)");
    } else {
      const r = await pool.query(
        `INSERT INTO secciones (clave, datos, actualizado_por) VALUES ($1,$2,'siembra')
         ON CONFLICT (clave) DO NOTHING RETURNING clave`, [clave, datos]);
      console.log((r.rows.length ? "+  " : "=  ") + clave + (r.rows.length ? "" : " (ya existía)"));
    }
  }
  await pool.end();
  console.log("\nListo.");
})().catch(e => { console.error(e); process.exit(1); });
