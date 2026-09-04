/* ══════════════════════════════════════════════════════════════════
   js/config.js — los tres interruptores del sitio.

   Este archivo venía corrupto en el .rar (0 bytes). Está reescrito.
   ══════════════════════════════════════════════════════════════════ */

/* ── 0. Dónde está la API ───────────────────────────────────────
   Frontend y backend están separados, así que el sitio tiene que
   saber a qué backend hablarle.

   NO edites esto en cada deploy. Se resuelve por hostname: cargás las
   URLs una vez, y el mismo commit sirve para local, para la URL de
   prueba y para el dominio final. Un archivo menos que tocar apurado
   antes de publicar (que es cuando uno se olvida).

   ⚠ Cada URL de ACÁ tiene que estar además en la variable
   ORIGENES_PERMITIDOS del backend, o el navegador bloquea las llamadas
   por CORS. Si no coinciden, el sitio NO se rompe: se dibuja con los
   datos/*.js del repo y no te enterás. Para saber si está bien, abrí
   diagnostico.html — te dice exactamente qué falta.

   Para una prueba rápida sin commitear, agregá ?api=https://... a la
   URL y manda ahí por esa visita.                                    */
var API_BASE_POR_HOST = {
  "localhost":          "http://localhost:3000",
  "127.0.0.1":          "http://localhost:3000",

  /* GitHub Pages — el primer deploy, mientras el dominio propaga.
     Pegá acá la URL que te da Railway (Settings → Networking). */
    "ngc1265.github.io":  "https://expoisipage-production.up.railway.app",

  /* Cloudflare Pages, si lo usás. La URL *.pages.dev del proyecto. */

  /* Dominio final. */
  "expoisi.com.ar":     "https://api.expoisi.com.ar",
  "www.expoisi.com.ar": "https://api.expoisi.com.ar"
};

var API_BASE = API_BASE_POR_HOST[location.hostname] || "";

/* ── 1. Modo edición ────────────────────────────────────────────
   true  → aparece el botón "✎ Editar" y funciona ?editar=1
   false → desaparece de todo el sitio. Poner en false el 16/09.   */
var EDICION_HABILITADA = true;

/* ── 2. Clave de edición ────────────────────────────────────────
   La clave es:  UTN+EXPO+ISI

   No está escrita acá en texto plano: se guarda el resultado de una
   función de mezcla (djb2). Evita que alguien la lea de un vistazo
   mirando el código fuente desde el navegador.

   ⚠ QUE QUEDE CLARO: esto NO es seguridad. La función está tres
   líneas más abajo, es reversible por fuerza bruta en segundos, y
   quien sepa abrir la consola entra igual. Sirve contra el visitante
   curioso que toca botones, no contra alguien que quiera romperlo.  */
var EDICION_CLAVE_HASH = 3294889947;

function EXPO_mezcla(s) {
  var h = 5381;
  for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h;
}
function EXPO_claveOk(intento) {
  return EXPO_mezcla(String(intento == null ? "" : intento).trim()) === EDICION_CLAVE_HASH;
}

/* ── 3. Qué se ve SIN la clave ──────────────────────────────────
   Con false (recomendado, y es lo pedido): los avisos amarillos de
   "falta cargar" NO se muestran en la vista normal. El visitante ve
   un sitio terminado; los huecos aparecen recién al entrar en edición.

   Poniéndolo en true se ven siempre — sirve para repartir tareas en
   el equipo sin que cada uno tenga que entrar con la clave.         */
var MOSTRAR_PENDIENTES_EN_VISTA = false;
