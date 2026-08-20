/* ══════════════════════════════════════════════════════════════════
   config.js — INTERRUPTOR GENERAL DEL MODO EDICIÓN
   ──────────────────────────────────────────────────────────────────

   ╔════════════════════════════════════════════════════════════════╗
   ║  EL DÍA DE LA EXPO: poné esto en false.                        ║
   ║                                                                ║
   ║      var EDICION_HABILITADA = false;                           ║
   ║                                                                ║
   ║  Con eso desaparece el botón "✎ Editar" de TODAS las páginas   ║
   ║  y ?editar=1 deja de funcionar. Un visitante no puede tocar    ║
   ║  nada aunque manotee la pantalla.                              ║
   ║                                                                ║
   ║  Es una sola línea, en un solo archivo. No hay que buscar      ║
   ║  nada más ni comentar código en los HTML.                      ║
   ╚════════════════════════════════════════════════════════════════╝

   ══════════════════════════════════════════════════════════════════ */

var EDICION_HABILITADA = true;   // ← true mientras cargan contenido
                                 // ← false el 16/09/2026


/* Contraseña opcional. Con el string vacío no pide nada.
   Si le ponés algo, el botón Editar pide esa palabra antes de abrir.
   No es seguridad real (está a la vista en este archivo): sirve para
   que nadie entre por accidente, nada más. */
var EDICION_CLAVE = "";
