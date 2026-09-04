/* ══════════════════════════════════════════════════════════════════
   datos/materias.js

   Este archivo NO repite las materias: las toma de datos/plan-estudios.js
   (nombre, nivel, correlativas, descripción). Acá solo se agrega lo que
   esa fuente no tiene: equipo docente, fotos y proyectos.

   Se indexa por el número de materia del plan. Para cargar una:

     19: {
       docentes: [
         { n: "Apellido, Nombre", cargo: "Jefe de cátedra" },
         { n: "Apellido, Nombre", cargo: "JTP" }
       ],
       fotos: [ { img:"../assets/fotos/materias/bd-01.jpg", titulo:"", pie:"" } ],
       proyectos: [ { titulo:"", texto:"", autores:"" } ]
     },

   ⚠ Los nombres de docentes son datos de terceros. Confirmá con el
   Departamento el listado vigente y pedí OK antes de publicar fotos.
   ══════════════════════════════════════════════════════════════════ */

var DETALLE_MATERIAS = {
  16: {
    docentes: [],
    fotos: [],
    proyectos: [],
    programa: "https://frba.utn.edu.ar/wp-content/uploads/2025/03/Analisis-de-Sistemas-de-Informacion_23.pdf",
    video: {
      src: "../assets/video/ads-adriana-martinez.mp4",
      poster: "../assets/video/ads-adriana-martinez-poster.jpg",
      titulo: "Análisis de Sistemas contado por la cátedra",
      pie: "Adriana Martínez · 2 min 11 s",
      _pendiente: "Confirmar con Adriana Martínez que autoriza exhibir el video en el stand y en el sitio público."
    }
  },
  23: {
    docentes: [],
    fotos: [],
    proyectos: [],
    programa: "https://frba.utn.edu.ar/wp-content/uploads/2023/11/Diseno_de_sistemas_de_Informacion_23.pdf"
  },
  15: {
    docentes: [],
    fotos: [],
    proyectos: [],
    programa: "https://frba.utn.edu.ar/wp-content/uploads/2025/03/Sistemas-Operativos_23.pdf"
  }
};
