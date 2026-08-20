/* ══════════════════════════════════════════════════════════════════
   datos/plan-estudios.js
   Plan K23 · Ingeniería en Sistemas de Información · UTN-FRBA

   FUENTE: dataset del archivo roadmap-plan2023-v2.html, que cita los
   programas analíticos oficiales publicados en frba.utn.edu.ar.
   Se tomó ese archivo como canónico frente a mapa_correlatividades_k23_v3
   porque es el único de los dos que referencia el PDF oficial por materia.

   ⚠ DISCREPANCIAS DETECTADAS entre los dos roadmaps — verificar contra
   el plan oficial antes del 16/09. Listadas en DISCREPANCIAS, más abajo.

   Campos por materia:
     id   número de materia en el plan
     n    nombre
     lv   nivel (año)
     tr   1 = integradora (la columna vertebral de la carrera)
     c    IDs que hay que tener CURSADAS (regularizadas)
     a    IDs que hay que tener APROBADAS (final rendido)
     d    descripción breve para ingresantes  ← editable
   ══════════════════════════════════════════════════════════════════ */

var MATERIAS = [
  { id: 1,  n: "Análisis Matemático I", lv: 1, tr: 0, c: [], a: [], d: "Funciones, límites, derivadas e integrales de una variable. La base matemática de todo lo que viene después." },
  { id: 2,  n: "Álgebra y Geometría Analítica", lv: 1, tr: 0, c: [], a: [], d: "Vectores, matrices, sistemas de ecuaciones y geometría en el espacio. Aparece después en gráficos, simulación y machine learning." },
  { id: 3,  n: "Física I", lv: 1, tr: 0, c: [], a: [], d: "Mecánica: cinemática, dinámica y energía. Modelar el mundo físico con matemática." },
  { id: 4,  n: "Inglés I", lv: 1, tr: 0, c: [], a: [], d: "Lectura técnica en inglés. Casi toda la documentación que vas a usar en tu vida profesional está en este idioma." },
  { id: 5,  n: "Lógica y Estructuras Discretas", lv: 1, tr: 0, c: [], a: [], d: "Lógica proposicional, conjuntos, relaciones, grafos y recursión. Cómo piensa una computadora." },
  { id: 6,  n: "Algoritmos y Estructuras de Datos", lv: 1, tr: 0, c: [], a: [], d: "Tu primera materia de programación de verdad: listas, árboles, ordenamiento, búsqueda y costo de los algoritmos." },
  { id: 7,  n: "Arquitectura de Computadoras", lv: 1, tr: 0, c: [], a: [], d: "Qué hay adentro de la máquina: procesador, memoria, buses y lenguaje ensamblador." },
  { id: 8,  n: "Sistemas y Procesos de Negocio", lv: 1, tr: 0, c: [], a: [], d: "Cómo funciona una organización por dentro y cómo se modelan sus procesos. La puerta de entrada al lado no técnico de la carrera." },

  { id: 9,  n: "Análisis Matemático II", lv: 2, tr: 0, c: [1, 2], a: [], d: "Cálculo en varias variables, series y ecuaciones diferenciales." },
  { id: 10, n: "Física II", lv: 2, tr: 0, c: [1, 3], a: [], d: "Electricidad, magnetismo y ondas: el fundamento físico de las comunicaciones y del hardware." },
  { id: 11, n: "Ingeniería y Sociedad", lv: 2, tr: 0, c: [], a: [], d: "El rol social del ingeniero, ética profesional e impacto de la tecnología." },
  { id: 12, n: "Inglés II", lv: 2, tr: 0, c: [4], a: [], d: "Inglés técnico avanzado: producción escrita y comprensión de documentación compleja." },
  { id: 13, n: "Sintaxis y Semántica de los Lenguajes", lv: 2, tr: 0, c: [5, 6], a: [], d: "Cómo se define y se procesa un lenguaje: gramáticas, autómatas, parsers y compiladores." },
  { id: 14, n: "Paradigmas de Programación", lv: 2, tr: 0, c: [5, 6], a: [], d: "Programación orientada a objetos, funcional y lógica. Deja de ser un solo lenguaje y pasa a ser formas de pensar." },
  { id: 15, n: "Sistemas Operativos", lv: 2, tr: 0, c: [7], a: [], d: "Procesos, concurrencia, gestión de memoria, sistemas de archivos y virtualización." },
  { id: 16, n: "Análisis de Sistemas de Información", lv: 2, tr: 1, c: [6, 8], a: [], d: "Primera integradora. Modelado conceptual de sistemas y de negocio, ciclos de vida, ingeniería de requerimientos y análisis orientado a objetos." },

  { id: 17, n: "Probabilidad y Estadística", lv: 3, tr: 0, c: [1, 2], a: [], d: "Probabilidad, distribuciones, inferencia y test de hipótesis. El motor matemático de la ciencia de datos." },
  { id: 18, n: "Economía", lv: 3, tr: 0, c: [], a: [1, 2], d: "Micro y macroeconomía aplicadas a la evaluación de proyectos tecnológicos." },
  { id: 19, n: "Bases de Datos", lv: 3, tr: 0, c: [13, 16], a: [5, 6], d: "Modelo relacional, SQL, normalización, transacciones e índices. Casi todo sistema guarda datos en algún lado." },
  { id: 20, n: "Desarrollo de Software", lv: 3, tr: 0, c: [14, 16], a: [5, 6], d: "Construcción de aplicaciones reales: arquitectura por capas, frameworks, control de versiones y trabajo en equipo." },
  { id: 21, n: "Comunicación de Datos", lv: 3, tr: 0, c: [], a: [3, 7], d: "Cómo viaja la información: señales, modulación, medios de transmisión y protocolos de bajo nivel." },
  { id: 22, n: "Análisis Numérico", lv: 3, tr: 0, c: [9], a: [1, 2], d: "Resolver con la computadora lo que no tiene solución analítica: aproximación, error e iteración." },
  { id: 23, n: "Diseño de Sistemas de Información", lv: 3, tr: 1, c: [14, 16], a: [4, 6, 8], d: "Segunda integradora. Arquitectura, patrones de diseño, persistencia, experiencia de usuario, integración de sistemas y validación del diseño." },

  { id: 24, n: "Legislación", lv: 4, tr: 0, c: [11], a: [], d: "Marco legal del ejercicio profesional: contratos, propiedad intelectual, protección de datos personales." },
  { id: 25, n: "Ingeniería y Calidad de Software", lv: 4, tr: 0, c: [19, 20, 23], a: [13, 14], d: "Procesos de desarrollo, testing, métricas, normas de calidad y gestión de la configuración." },
  { id: 26, n: "Redes de Datos", lv: 4, tr: 0, c: [15, 21], a: [], d: "TCP/IP, ruteo, conmutación, diseño de redes y servicios de infraestructura." },
  { id: 27, n: "Investigación Operativa", lv: 4, tr: 0, c: [17, 22], a: [], d: "Optimización, programación lineal, colas y grafos aplicados a decisiones reales." },
  { id: 28, n: "Simulación", lv: 4, tr: 0, c: [17], a: [9], d: "Modelar sistemas complejos y correrlos por computadora cuando experimentar en la realidad es caro o imposible." },
  { id: 29, n: "Tecnologías para la Automatización", lv: 4, tr: 0, c: [10, 22], a: [9], d: "Control, sensores, actuadores y sistemas embebidos. La ingeniería de sistemas fuera de la pantalla." },
  { id: 30, n: "Administración de Sistemas de Información", lv: 4, tr: 1, c: [18, 23], a: [16], d: "Tercera integradora. Gestión de proyectos, planificación estratégica de sistemas, presupuesto y gobierno de TI." },

  { id: 31, n: "Inteligencia Artificial", lv: 5, tr: 0, c: [28], a: [17, 22], d: "Búsqueda, representación del conocimiento, aprendizaje automático y redes neuronales." },
  { id: 32, n: "Ciencia de Datos", lv: 5, tr: 0, c: [28], a: [17, 19], d: "Del dato crudo a la decisión: exploración, modelado, visualización y comunicación de resultados." },
  { id: 33, n: "Sistemas de Gestión", lv: 5, tr: 0, c: [18, 27], a: [23], d: "ERP, CRM y sistemas de gestión empresarial: implementación, parametrización e integración." },
  { id: 34, n: "Gestión Gerencial", lv: 5, tr: 0, c: [24, 30], a: [18], d: "Dirección de organizaciones tecnológicas: estrategia, finanzas, liderazgo y gestión de personas." },
  { id: 35, n: "Seguridad en los Sistemas de Información", lv: 5, tr: 0, c: [26, 30], a: [20, 21], d: "Criptografía, gestión de riesgos, hardening, respuesta a incidentes y normativa de seguridad." },
  { id: 36, n: "Proyecto Final", lv: 5, tr: 1, c: [25, 26, 30], a: [12, 20, 23], d: "Cuarta integradora y cierre de la carrera: un sistema completo, de punta a punta, en equipo y con un cliente real." }
];

/* ⚠ Verificar contra el plan oficial antes de publicar. */
var DISCREPANCIAS = [
  "Ingeniería y Sociedad: nivel 2 en un roadmap, nivel 1 en el otro.",
  "Probabilidad y Estadística: nivel 3 vs nivel 2.",
  "Análisis Numérico: nivel 3 vs nivel 4.",
  "Redes de Datos: nivel 4 vs nivel 3.",
  "Ciencia de Datos: nivel 5 vs nivel 4.",
  "Administración de SI (30): correlativas cursadas [Economía, DSI] vs [DSI, Desarrollo de SW, Ingeniería y Calidad].",
  "Análisis Matemático II: cursadas [AM I, Álgebra] vs solo [AM I].",
  "Economía y Comunicación de Datos: un roadmap las pide APROBADAS, el otro CURSADAS.",
  "Seminario Integrador, Práctica Profesional Supervisada y las electivas aparecen en un roadmap y no en el otro."
];

/* ── Electivas ────────────────────────────────────────────────── */
var ELECTIVAS = {
  texto: "Además de las 36 obligatorias, el plan incluye materias electivas que permiten armar un recorrido " +
         "propio. Se eligen en los últimos niveles y son la forma de especializarse sin cambiar de carrera.",
  _pendiente: "Cargar el listado real de electivas vigentes de la FRBA con carga horaria y requisitos."
};

/* ── Tutorías ─────────────────────────────────────────────────── */
var TUTORIAS = {
  titulo: "No arrancás sola ni solo",
  desde: 2004,
  texto: "Desde 2004 la Facultad Regional Buenos Aires tiene un Sistema Institucional de Tutorías: " +
         "un acompañamiento personalizado durante los primeros años de la carrera, que son los más duros.",
  detalle: "La tutoría es un proceso de acompañamiento que se concreta como atención personalizada a un " +
           "estudiante o a un grupo, a cargo de docentes, auxiliares, estudiantes de los últimos años y " +
           "graduados formados específicamente para esa función. Se apoya en las teorías del aprendizaje " +
           "más que en las de la enseñanza: la idea no es volver a explicar el tema, sino ayudarte a " +
           "encontrar tu forma de estudiar, organizarte y sostener la cursada.",
  puntos: [
    "Orientación durante los primeros años, que es donde más gente abandona.",
    "Talleres de competencias transversales: cómo estudiar, cómo organizarse, cómo trabajar en equipo.",
    "Tutores que son estudiantes avanzados y graduados: pasaron por lo mismo hace poco.",
    "Articulación con el nivel medio para que la transición al primer año no sea un salto al vacío."
  ],
  url: "https://frba.utn.edu.ar/tag/tutorias/",
  qr: "frba-tutorias"
};

/* ── Equipo interdisciplinario de apoyo ─────────────────────────
   ⚠ La descripción general está tomada del modelo institucional UTN.
   Hay que confirmar con la FRBA la conformación y las áreas locales. */
var APOYO = {
  titulo: "Equipo interdisciplinario de apoyo",
  texto: "La carrera no es solo cursar. Hay un equipo con perfiles de psicología, ciencias de la educación " +
         "y trabajo social que acompaña las trayectorias estudiantiles más allá de lo académico.",
  areas: [
    { n: "Red tutorial", d: "Coordinación de los programas de tutorías académicas y del espacio de tutores." },
    { n: "Prácticas estudiantiles", d: "Desempeño académico, desarrollo de competencias genéricas y consultas de trayectoria." },
    { n: "Articulación con el nivel medio", d: "Acercamiento de la Facultad a estudiantes secundarios y espacios interniveles." },
    { n: "Salud y discapacidad", d: "Bienestar estudiantil, acompañamiento áulico, información y orientación a personas en situación de discapacidad." }
  ],
  _pendiente: "Confirmar con Secretaría Académica de la FRBA los nombres exactos de las áreas, quién las " +
              "coordina y el canal de contacto. La estructura de arriba está tomada del modelo UTN general."
};

/* ── Laboratorios ─────────────────────────────────────────────── */
var LABORATORIOS = [
  {
    sede: "Campus",
    titulo: "Laboratorio de Sistemas · Campus",
    texto: "Espacio de práctica con equipamiento propio para las materias de programación, bases de datos y redes.",
    _pendiente: "Completar: cantidad de aulas, equipamiento, horarios de uso libre, software instalado.",
    fotos: [
      { img: "../assets/fotos/laboratorios/laboratorio-pasillo-egresada.jpg", titulo: "El pasillo del laboratorio", pie: "Una egresada con docentes de la carrera, en la entrada del laboratorio" }
    ]
  },
  {
    sede: "Medrano",
    titulo: "Laboratorio de Sistemas · Sede Medrano",
    texto: "Varias aulas separadas y equipadas, cada una preparada para distintos tipos de práctica.",
    _pendiente: "Completar: cuántas aulas, qué equipamiento tiene cada una, a qué materias sirve cada laboratorio.",
    fotos: []
  }
];
