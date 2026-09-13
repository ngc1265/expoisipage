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
  8: {
    docentes: [],
    fotos: [],
    proyectos: [],
    video: {
      src: "../assets/video/sypdn-florencia.mp4",
      poster: "../assets/video/sypdn-florencia-poster.jpg",
      titulo: "La cátedra cuenta Sistemas y Procesos de Negocio",
      pie: "Florencia · 2 min 6 s"
    }
  },
  16: {
    docentes: [],
    fotos: [],
    proyectos: [],
    programa: "https://frba.utn.edu.ar/wp-content/uploads/2025/03/Analisis-de-Sistemas-de-Informacion_23.pdf",
    video: {
      src: "../assets/video/ads-adriana-martinez.mp4",
      poster: "../assets/video/ads-adriana-martinez-poster.jpg",
      titulo: "La cátedra cuenta Análisis de Sistemas",
      pie: "Adriana Martínez · 2 min 11 s"
    }
  },
  23: {
    docentes: [],
    fotos: [],
    proyectos: [],
    programa: "https://frba.utn.edu.ar/wp-content/uploads/2023/11/Diseno_de_sistemas_de_Informacion_23.pdf",
    video: {
      src: "../assets/video/ddsi-ezequiel.mp4",
      poster: "../assets/video/ddsi-ezequiel-poster.jpg",
      titulo: "La cátedra cuenta Diseño de Sistemas",
      pie: "Ezequiel · 2 min 7 s"
    }
  },
  15: {
    docentes: [],
    fotos: [],
    proyectos: [],
    programa: "https://frba.utn.edu.ar/wp-content/uploads/2025/03/Sistemas-Operativos_23.pdf"
  },

  36: {
    docentes: [],
    fotos: [],
    proyectos: [],
    video: {
      src: "../assets/video/proyecto-final.mp4",
      poster: "../assets/video/proyecto-final-poster.jpg",
      titulo: "La cátedra cuenta Proyecto Final",
      pie: "1 min 51 s"
    }
  }
};
