/* ══════════════════════════════════════════════════════════════════
   datos/electivas.js — sección "Electivas"

   ⚠ ESTADO: la carpeta "Electivas" del ZIP de videos llegó VACÍA
   (0 archivos). Este contenido está armado con la estructura del plan,
   no con material de las cátedras. Falta el listado oficial.

   Campos: titulo, texto, items[], url+qr, video{src,poster,titulo,pie},
           _pendiente
   ══════════════════════════════════════════════════════════════════ */

var BLOQUES = [
  {
    titulo: "Qué son las electivas",
    texto: "Además de las materias obligatorias, la carrera exige aprobar un conjunto de asignaturas electivas. " +
           "Son la parte del plan que elegís vos: te permiten profundizar en un campo (datos, seguridad, gestión, " +
           "sistemas embebidos) sin cambiar de carrera ni de título.",
    items: [
      "Se cursan en los últimos años, cuando ya sabés qué te interesa.",
      "El título que sale es el mismo: lo que cambia es tu perfil.",
      "Se pueden combinar con prácticas, becas de investigación o proyectos de cátedra."
    ]
  },
  {
    titulo: "Oferta vigente",
    texto: "",
    items: [],
    _pendiente: "Pedir al Departamento de Sistemas el listado oficial de electivas del ciclo lectivo, con carga horaria, correlativas y período de dictado. Sin esto la sección no se puede publicar."
  },
  {
    titulo: "Videos de las cátedras",
    texto: "",
    items: [],
    _pendiente: "La carpeta Videos/Electivas del ZIP llegó vacía. Hay que grabar o pedir los videos a los docentes de cada electiva. Formato sugerido: 60-90 s, horizontal, mp4."
  }
];
