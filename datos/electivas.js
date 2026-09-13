/* ══════════════════════════════════════════════════════════════════
   datos/electivas.js — sección "Electivas"

   Fuentes: (1) Diseño curricular ISI Plan 2023, Ordenanza n° 1877,
   del sitio del Departamento; (2) correcciones del Departamento de
   septiembre de 2026.

   ⚠ El PDF publicado está DESACTUALIZADO respecto de lo que se dicta:
   lista todas las electivas como 3° / 4° nivel y no incluye las de
   5° nivel. Las diferencias conocidas:
     · "Seguridad Defensiva" reemplaza a "Ciberseguridad" (3° nivel)
     · "IA Generativa en Sistemas Agénticos" — 5° nivel, no figura
     · "Gestión de las Arquitecturas de Implementación Tecnológica"
       — 5° nivel, no figura
   Si aparece otra diferencia, gana lo que diga el Departamento.

   ⚠ Lo que SÍ está confirmado: los nombres y el nivel, que salen del
   listado oficial.
   ⚠ Lo que NO: la descripción de una línea de cada una la redacté
   para el stand a partir del nombre. Hay que contrastarla con el
   programa de cada cátedra antes de darla por buena. Tampoco están
   la carga horaria ni el período de dictado.

   Campos: titulo, texto, items[], url+qr, video{}
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
      "La oferta se publica cada cuatrimestre: no siempre se dictan todas.",
      "Las electivas de 5.º nivel del Plan 2008 se homologan al Plan 2023."
    ]
  },

  {
    titulo: "Construcción de software",
    texto: "Para quien quiere programar mejor, no solo más.",
    items: [
      "Gestión de las Arquitecturas de Implementación Tecnológica (5.º nivel)",
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
      "IA Generativa en Sistemas Agénticos (5.º nivel)",
      "Procesamiento del Lenguaje Natural",
      "Técnicas de Gráficos por Computadora"
    ]
  },

  {
    titulo: "Seguridad",
    texto: "Dos electivas que se complementan: una mira el sistema entero, la otra la matemática que lo sostiene.",
    items: [
      "Seguridad Defensiva (3.º nivel) — reemplaza a Ciberseguridad",
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
    titulo: "Ambiente y sostenibilidad",
    texto: "El impacto ambiental de la tecnología dejó de ser un tema de otra carrera.",
    items: [
      "Química Ambiental"
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
    leyenda: "Plan 2023 — Ordenanza n° 1877."
  },

  {
    titulo: "IA Generativa en Sistemas Agénticos",
    texto: "Electiva de 5.º nivel. La cátedra presenta la asignatura en dos minutos y medio.",
    video: {
      src: "../assets/video/ia-generativa.mp4",
      poster: "../assets/video/ia-generativa-poster.jpg",
      pie: "Presentación de la asignatura · 2 min 40 s"
    }
  },

  {
    titulo: "TASD",
    texto: "Presentación de la asignatura, grabada en septiembre de 2026.",
    video: {
      src: "../assets/video/tasd.mp4",
      poster: "../assets/video/tasd-poster.jpg",
      pie: "Presentación de la asignatura · 1 min 9 s"
    }
  }
];
