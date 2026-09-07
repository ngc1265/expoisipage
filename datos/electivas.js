/* ══════════════════════════════════════════════════════════════════
   datos/electivas.js — sección "Electivas"

   Fuente: Diseño curricular Ingeniería en Sistemas de Información
   Plan 2023, Ordenanza n° 1877 (sitio del Departamento, UTN.BA).
   Las 19 electivas de la oferta, todas de 3° / 4° nivel.

   ⚠ Lo que SÍ está confirmado: los nombres y el nivel, que salen del
   listado oficial.
   ⚠ Lo que NO: la descripción de una línea de cada una la redacté
   para el stand a partir del nombre. Hay que contrastarla con el
   programa de cada cátedra antes de darla por buena. Tampoco están
   la carga horaria ni el período de dictado.

   Campos: titulo, texto, items[], url+qr, video{}, _pendiente
   ══════════════════════════════════════════════════════════════════ */

var BLOQUES = [
  {
    titulo: "Qué son las electivas",
    texto: "Además de las materias obligatorias, el Plan 2023 te pide aprobar electivas. " +
           "Son la parte del plan que elegís vos: te dejan profundizar en un campo sin cambiar " +
           "de carrera ni de título. Todas se cursan en 3° o 4° nivel, cuando ya sabés qué te interesa.",
    items: [
      "El título que sale es el mismo: lo que cambia es tu perfil.",
      "Se pueden combinar con prácticas, becas de investigación o proyectos de cátedra.",
      "La oferta se publica cada cuatrimestre: no siempre se dictan todas."
    ]
  },

  {
    titulo: "Construcción de software",
    texto: "Para quien quiere programar mejor, no solo más.",
    items: [
      "Técnicas Avanzadas de Programación",
      "Tecnologías Avanzadas en la Construcción de Software",
      "Patrones Algorítmicos",
      "Ingeniería de Requisitos"
    ]
  },

  {
    titulo: "Datos, IA y cómputo",
    texto: "El campo que más creció en la última década, y donde la carrera tiene base fuerte.",
    items: [
      "Procesamiento del Lenguaje Natural",
      "Técnicas de Gráficos por Computadora",
      "Química Ambiental"
    ],
    _pendiente: "Química Ambiental no encaja en este grupo. Revisar en qué bloque va, o si conviene un bloque aparte de ambiente y sostenibilidad."
  },

  {
    titulo: "Seguridad",
    texto: "Dos electivas que se complementan: una mira el sistema entero, la otra la matemática que lo sostiene.",
    items: [
      "Ciberseguridad",
      "Criptografía"
    ]
  },

  {
    titulo: "Personas y producto",
    texto: "Lo que decide si un sistema se usa o se abandona.",
    items: [
      "Experiencia de Usuario y Accesibilidad",
      "Comunicación Gráfica y Visual",
      "Creatividad e Innovación"
    ]
  },

  {
    titulo: "Gestión y organizaciones",
    texto: "Para quien va a conducir equipos y proyectos, que en Sistemas pasa antes de lo que uno cree.",
    items: [
      "Gerenciamiento de Proyectos de Sistemas de Información",
      "Metodología de la Conducción de Equipos de Trabajo",
      "Administración Estratégica del Capital Humano",
      "Gestión del Talento Humano",
      "Transformación Digital",
      "Tendencias y Escenarios Tecnológicos"
    ]
  },

  {
    titulo: "Investigación",
    texto: "La puerta de entrada a los grupos de I+D de la Facultad y a la carrera académica.",
    items: [
      "Metodología de Investigación Científico-Tecnológica"
    ]
  },

  {
    titulo: "El plan completo",
    texto: "Programas, correlativas y el diseño curricular entero, en el sitio del Departamento.",
    url: "https://frba.utn.edu.ar/carreras/ingenieria-en-sistemas-de-informacion/plan-de-estudios/",
    qr: "plan-2023",
    leyenda: "Plan 2023 — Ordenanza n° 1877.",
    _pendiente: "Verificar que la URL sea la definitiva del Departamento antes de imprimir el QR."
  },

  {
    titulo: "Videos de las cátedras",
    texto: "",
    items: [],
    _pendiente: "La carpeta Videos/Electivas del ZIP llegó vacía. Pedir a los docentes un video corto por electiva: 60-90 s, horizontal, mp4."
  }
];
