/* ══════════════════════════════════════════════════════════════════
   js/api.js — puente entre el frontend estático y la API.

   ARQUITECTURA: frontend y backend están SEPARADOS, en dominios
   distintos:

     expoisi.com.ar      → sitio estático (CDN)
     api.expoisi.com.ar  → API + medios subidos (Railway)

   Eso trae una consecuencia que hay que entender antes de tocar nada:

   ┌──────────────────────────────────────────────────────────────┐
   │ NO SE USAN COOKIES DE SESIÓN. Se usa un token Bearer.        │
   │                                                              │
   │ Con dos orígenes, la cookie de sesión pasa a ser una cookie  │
   │ de tercera parte. Safari las bloquea de entrada y Chrome va  │
   │ en la misma dirección. Un login que funciona hoy en Chrome y │
   │ no en el iPhone de un docente es exactamente el bug que uno  │
   │ no quiere descubrir el día que alguien necesita cargar algo. │
   │                                                              │
   │ El token se guarda en sessionStorage y viaja en el header    │
   │ Authorization. Muere al cerrar la pestaña.                   │
   └──────────────────────────────────────────────────────────────┘

   REGLA QUE NO SE ROMPE: el sitio abre igual sin API. Si la API no
   responde, tarda demasiado, o se abrió con doble clic (file://),
   se dibuja con los datos/*.js del repo.

   Va DESPUÉS de config.js y comun.js, y ANTES del script de la sección.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.EXPO;
  if (!E) { console.error("api.js va después de comun.js"); return; }

  var ESPERA_MS = 2500;
  var LLAVE_TOKEN = "expo_token";

  /* Base de la API. Sale de js/config.js (mapa por hostname).
     ?api=https://... la pisa para esa visita: sirve para probar un
     backend nuevo sin commitear ni esperar un deploy. */
  var forzada = (location.search.match(/[?&]api=([^&]+)/) || [])[1];
  var BASE = (forzada ? decodeURIComponent(forzada)
                      : (typeof API_BASE !== "undefined" && API_BASE ? String(API_BASE) : ""))
             .replace(/\/+$/, "");

  var api = {
    base: BASE,
    disponible: false,
    versiones: {},
    sesion: null,
    error: null
  };

  /* ── Token ──────────────────────────────────────────────────────
     sessionStorage y no localStorage: que el token no sobreviva a la
     pestaña. En una máquina compartida de la Facultad, un token que
     queda vivo es una sesión de edición abierta para el que se siente
     después.

     Sí, un XSS puede leerlo. Para este sitio la superficie es chica
     (contenido público, clave compartida, sin datos personales en la
     base) y el precio de no usarlo es que el login no ande en Safari.
     Si algún día esto guarda algo sensible, hay que revisarlo.        */
  function leerToken() {
    try { return sessionStorage.getItem(LLAVE_TOKEN); } catch (e) { return null; }
  }
  function guardarToken(t) {
    try { t ? sessionStorage.setItem(LLAVE_TOKEN, t) : sessionStorage.removeItem(LLAVE_TOKEN); }
    catch (e) { /* file:// o storage bloqueado: la sesión dura lo que dure la página */ }
    tokenMemoria = t || null;
  }
  var tokenMemoria = null;
  function token() { return tokenMemoria || leerToken(); }

  function cabeceras(extra) {
    var h = extra || {};
    var t = token();
    if (t) h["Authorization"] = "Bearer " + t;
    return h;
  }

  function pedir(ruta, opciones) {
    opciones = opciones || {};
    opciones.headers = cabeceras(opciones.headers);
    opciones.mode = "cors";
    /* credentials: "omit" es lo correcto acá — no mandamos cookies a
       propósito, y pedirlas obligaría al servidor a responder con
       Allow-Credentials, que es justo lo que estamos evitando. */
    opciones.credentials = "omit";
    return fetch(BASE + ruta, opciones).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) {
          if (r.status === 401) { guardarToken(null); api.sesion = null; }
          throw Object.assign(new Error(j.error || ("HTTP " + r.status)),
                              { estado: r.status, cuerpo: j });
        }
        return j;
      });
    });
  }

  /* ── Arranque diferido ────────────────────────────────────────── */
  var pendientes = [], resuelto = false;

  function seguir() {
    if (resuelto) return;
    resuelto = true;
    pendientes.forEach(function (cb) { try { cb(); } catch (e) { console.error(e); } });
    pendientes = [];
  }

  E.alCargarDatos = function (cb) {
    if (resuelto) { cb(); return; }
    pendientes.push(cb);
  };

  function aplicar(payload) {
    Object.keys(payload).forEach(function (clave) {
      var entrada = payload[clave];
      if (!entrada || !entrada.datos) return;
      api.versiones[clave] = entrada.version;
      Object.keys(entrada.datos).forEach(function (variable) {
        /* Solo pisamos variables que el sitio ya conoce: si la base
           trae algo con otro nombre, se ignora. */
        if (variable in window) window[variable] = entrada.datos[variable];
      });
    });
  }

  /* ── Operaciones ──────────────────────────────────────────────── */

  api.guardar = function (clave, datos) {
    return pedir("/api/contenido/" + encodeURIComponent(clave), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ datos: datos, version: api.versiones[clave] })
    }).then(function (j) {
      api.versiones[clave] = j.version;
      return j;
    });
  };

  api.entrar = function (clave, nombre) {
    return pedir("/api/sesion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clave: clave, nombre: nombre })
    }).then(function (j) {
      guardarToken(j.token);
      api.sesion = j.nombre;
      return j;
    });
  };

  api.salir = function () {
    var p = token() ? pedir("/api/sesion", { method: "DELETE" }).catch(function () { }) 
                    : Promise.resolve();
    return p.then(function () { guardarToken(null); api.sesion = null; });
  };

  api.subir = function (archivos) {
    var fd = new FormData();
    Array.prototype.forEach.call(archivos, function (f) { fd.append("archivos", f); });
    /* Sin Content-Type a mano: el navegador tiene que poner el boundary. */
    return pedir("/api/medios", { method: "POST", body: fd })
      .then(function (j) { return j.archivos; });
  };

  api.historial = function (clave) {
    return pedir("/api/historial/" + encodeURIComponent(clave));
  };

  /* Las URLs de medios que devuelve la API son relativas al backend.
     Los módulos las pasan por acá para poder pintarlas. */
  api.url = function (ruta) {
    if (!ruta) return ruta;
    if (/^(https?:|data:|blob:)/.test(ruta)) return ruta;
    if (ruta.indexOf("/medios/") === 0) return BASE + ruta;
    return ruta;   /* ../assets/... sigue siendo del frontend */
  };

  E.api = api;

  /* ── Descubrimiento ───────────────────────────────────────────── */
  var hayRed = location.protocol === "http:" || location.protocol === "https:";
  if (!hayRed || !BASE) {
    if (hayRed && !BASE) api.error = "API_BASE está vacío en js/config.js: se está viendo la copia local.";
    seguir();
    return;
  }

  var corto = setTimeout(function () {
    api.error = "La API no respondió a tiempo. Se está viendo la copia local.";
    seguir();
  }, ESPERA_MS);

  pedir("/api/contenido", { cache: "no-store" })
    .then(function (j) {
      aplicar(j);
      api.disponible = true;
      if (!token()) return;
      return pedir("/api/sesion")
        .then(function (s) { if (s.activa) api.sesion = s.nombre; })
        .catch(function () { });
    })
    .catch(function (e) {
      api.error = "Sin conexión con la API: se está viendo la copia local del repositorio.";
      console.warn("api.js:", e.message);
    })
    .then(function () { clearTimeout(corto); seguir(); });
})();
