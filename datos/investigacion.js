/* datos/investigacion.js
   Congresos, publicaciones, vinculación con graduados y cooperación internacional.
   Documentación de los campos: datos/LEEME-datos.md */

/* ── Panorama general ──────────────────────────────────────────────
   Va primero en la sección, antes de los congresos y las ponencias.

   Razón: lo que está cargado abajo es, casi todo, lo que relevó una
   sola cátedra. Presentarlo sin contexto da la impresión de que eso ES
   la investigación de la carrera, y no lo es ni por asomo. Este bloque
   ordena la expectativa: explica cómo funciona el sistema, nombra a
   GEMIS como grupo de referencia, y deja claro que lo de abajo es una
   muestra y no un inventario.                                          */
var PANORAMA = {
  epigrafe: "Cómo funciona",
  titulo: "Investigar y extender desde la Facultad",
  intro: "En la UTN la investigación no es una carrera aparte: se hace dentro de la Facultad, " +
         "en grupos y centros donde conviven docentes, graduados y estudiantes. " +
         "Se entra antes de recibirse, y muchas veces empieza por una materia.",
  vias: [
    {
      titulo: "Grupos y centros de I+D",
      texto: "Equipos estables con líneas de trabajo propias y proyectos acreditados. " +
             "Es el camino más común: entrás como becario o como estudiante en formación."
    },
    {
      titulo: "Becas y proyectos acreditados",
      texto: "Los proyectos se presentan y se evalúan, y muchos incluyen becas para estudiantes. " +
             "Se cobra, se publica y suma a la trayectoria."
    },
    {
      titulo: "Desde las cátedras",
      texto: "Varias materias producen trabajos que terminan en congresos. " +
             "Es la puerta de entrada más corta: ya estás cursando."
    },
    {
      titulo: "Extensión",
      texto: "Llevar lo que se produce a municipios, escuelas, ONG y empresas. " +
             "No es investigación, pero se hace desde los mismos equipos."
    }
  ],
  referente: {
    sigla: "GEMIS",
    nombre: "Grupo de Estudio de Metodologías para Ingeniería en Sistemas",
    texto: "El grupo de referencia del Departamento en investigación aplicada. Trabaja en " +
           "metodologías, procesos e ingeniería de software, con proyectos acreditados y " +
           "participación de estudiantes y graduados. Si te interesa investigar, es el primer " +
           "lugar donde preguntar.",
    nota: "Hay más grupos y proyectos en el Departamento de los que entran en este stand."
  },
  cierre: "Lo que sigue abajo es una muestra: los congresos donde se presenta la carrera y " +
          "algunos trabajos recientes. No es el inventario completo de lo que se investiga acá."
};

/* ── GEMIS ─────────────────────────────────────────────────────────
   Grupo de Estudio de Metodologías para Ingeniería en Sistemas.

   Los números y los casos salen de la copia del sitio del grupo
   (assets/data/*.json, sincronizada el 13/09/2026). Son un RESUMEN
   para el stand, no un espejo: el sitio del grupo es la fuente y se
   actualiza sola, esta ficha no.

   Por eso el enlace al sitio propio va bien visible: si algún dato
   de acá queda viejo, el visitante tiene dónde ver el actual.        */
var GEMIS = {
  sigla: "GEMIS",
  nombre: "Grupo de Estudio de Metodologías para Ingeniería en Sistemas",
  intro: "El grupo de investigación del Departamento. Trabaja en metodologías, " +
         "gestión del conocimiento e inteligencia artificial aplicada, con proyectos " +
         "acreditados, transferencia a empresas y estudiantes participando desde el grado.",
  numeros: [
    { n: "10", que: "investigadores" },
    { n: "17", que: "tesistas" },
    { n: "15", que: "investigadores en formación" },
    { n: "131", que: "integrantes pasaron por el grupo" }
  ],
  lineas: [
    { titulo: "IA y Sistemas Inteligentes", texto: "Aprendizaje automático y sistemas inteligentes aplicados a problemas reales." },
    { titulo: "Gestión del Conocimiento", texto: "Cómo una organización captura, ordena y reutiliza lo que sabe." },
    { titulo: "Educación y TIC", texto: "Tecnología aplicada a la enseñanza y al aprendizaje." },
    { titulo: "Ingeniería de Software", texto: "Métodos y procesos para construir software que se pueda sostener." }
  ],
  proyectos: [
    { titulo: "Modelo integral de gestión del conocimiento para pymes argentinas", periodo: "2025-2027" },
    { titulo: "Observatorio tecnológico de Gestión del Conocimiento en CABA", periodo: "2023-2025" },
    { titulo: "IA para análisis predictivo en salud mental", periodo: "2023-2025" }
  ],
  transferencia: [
    { titulo: "Metodología para el desarrollo de Chatbots, Alex", organizacion: "DAEVA S.A.", periodo: "" },
    { titulo: "GuardIA", organizacion: "DAEVA S.A.", periodo: "Mayo - Julio 2019" },
    { titulo: "CUERPOHUMATHNO", organizacion: "DAEVA S.A.", periodo: "Octubre 2018 - Septiembre 2019" },
    { titulo: "Puntos Verdes Inteligentes Interactivos", organizacion: "DAEVA S.A.", periodo: "Informe anual 2016" },
    { titulo: "Solución de armado de formaciones móviles", organizacion: "DAEVA S.A. / Trenes Argentinos", periodo: "Octubre 2019 - Septiembre 2020" }
  ],
  eventos: [
    "International Workshop on Knowledge Management, Innovation and Technologies",
    "International Workshop on Applied Artificial Intelligence"
  ],
  publicaciones: "28 publicaciones con referencia completa en el sitio del grupo.",
  url: "https://www.grupogemis.com/",
  qr: "gemis",
  cta: "Ver el sitio del grupo",
  nota: "Resumen preparado para el stand. La fuente actualizada es el sitio del grupo."
};

var CONGRESOS = [
  {
    sigla: "CICE",
    nombre: "Congreso de Innovación y Creatividad Educativa en Enseñanza Tecnológica",
    organiza: "Secretaría Académica de Rectorado UTN + una Facultad Regional anfitriona",
    quien: "Docentes, estudiantes e investigadores",
    descripcion: "El congreso de la UTN dedicado a cómo se enseña ingeniería. Se presentan experiencias de aula, investigaciones educativas, pósteres y relatos estudiantiles. La cátedra de Diseño de Sistemas participa con trabajos sobre plataformas educativas, gamificación, accesibilidad y uso de inteligencia artificial en la enseñanza.",
    edicion: "5.ª edición · 12 y 13 de agosto de 2026 · Facultad Regional Bahía Blanca",
    lema: "Educación en obra: diálogo en comunidad para innovar y aprender",
    url: "https://cice2026.frbb.utn.edu.ar/",
    qr: "cice",
    color: "var(--a1)"
  },
  {
    sigla: "CoNaIISI",
    nombre: "Congreso Nacional de Ingeniería Informática / Sistemas de Información",
    organiza: "Red RIISIC, en el marco del CONFEDI",
    quien: "Docentes, graduados y estudiantes",
    descripcion: "El congreso científico de referencia de la carrera en Argentina. Se envían artículos originales sobre ingeniería de software, ciberseguridad e informática forense, inteligencia artificial, bases de datos y ciencia de datos, redes, gestión de proyectos y educación en ingeniería. Tiene un formato de presentación específico para estudiantes, distinto del de investigadores.",
    edicion: "14.ª edición · 12 y 13 de noviembre de 2026 · Facultad Regional Resistencia",
    lema: "Potenciando el ecosistema digital: sistemas que aprenden, ingeniería que transforma",
    url: "https://conaiisi2026.frre.utn.edu.ar/",
    qr: "conaiisi",
    color: "var(--a2)"
  },
  {
    sigla: "CNEISI",
    nombre: "Congreso Nacional de Estudiantes de Ingeniería en Sistemas de Información",
    organiza: "Estudiantes avanzados, consejeros estudiantiles y Centro de Estudiantes de la regional sede",
    quien: "Estudiantes de las 17 regionales que dictan la carrera",
    descripcion: "Congreso hecho por estudiantes y para estudiantes. Tres días de charlas, workshops, presentación de proyectos votados por los propios alumnos y una competencia Capture The Flag de lógica, programación y ciberseguridad. Es el lugar donde se conoce gente de la carrera de todo el país.",
    edicion: "15.ª edición · 14 al 16 de agosto de 2026 · Facultad Regional San Francisco · más de 500 asistentes",
    lema: "Un espacio movilizado por los estudiantes, para los estudiantes",
    url: "https://cneisi.sanfrancisco.utn.edu.ar/",
    qr: "cneisi",
    color: "var(--a3)"
  }
];

var PONENCIAS = [
  {
    titulo: "Pobreza del tiempo en estudiantes universitarios de ingeniería",
    congreso: "CICE 2026 · Póster",
    autores: "Brandao De Almeida, Mailén; Pérez López, Natalia; Saclier, Lucas; Villarruel, Ignacio",
    resumen: "Estudio longitudinal sobre trayectorias, deserción y posibilidades pedagógicas. Se analizaron 306 entregas del ejercicio de Design Thinking de la materia Experiencia de Usuario y Accesibilidad en 9 cohortes (2022-2026). Identificó 29 casos que documentan la escasez y desorganización del tiempo como obstáculo central de la trayectoria, y describe la \"deserción silenciosa\": una categoría real que el sistema de gestión académica no captura y que requiere indicadores de alerta temprana.",
    foto: "../assets/fotos/congresos/cice2026-poster-pobreza-tiempo.jpg",
    audio: "https://ddsi.com.ar/cice26/tiempo/",
    qr: "poster-tiempo", autorizado: true
  },
  {
    titulo: "Neurodiversidad y accesibilidad en la educación híbrida",
    congreso: "CICE 2026 · Póster",
    autores: "Contreras, Nicolás; Escobar; Sabatino; Sandoval, Aylén — con la colaboración de Brandao",
    resumen: "Estudio piloto sobre la presencia de estudiantes neurodivergentes en modalidad híbrida y propuesta de un marco escalable de estrategias inclusivas en la cátedra de Diseño de Sistemas de la UTN-FRBA.",
    foto: "../assets/fotos/congresos/cice2026-poster-neurodiversidad.jpg",
    audio: "https://ddsi.com.ar/cice26/neuro/",
    qr: "poster-neuro", autorizado: true
  }
];

var PUBLICACION = {
  titulo: "Propuesta de proceso para el Diseño de Sistemas basado en Design Thinking",
  autores: "Lucas Saclier · Martín Agüero · Pablo Sabatino · Paula Zanetti · Nicolás Contreras",
  filiacion: "Cátedra Diseño de Sistemas · Departamento de Ingeniería en Sistemas de Información · UTN-FRBA",
  evento: "CoNaIISI 2017 · Congreso Nacional de Ingeniería Informática / Sistemas de Información",
  palabras: ["design thinking", "diseño de sistemas", "educación", "industria", "metodología"],
  abstract: "Diseñar sistemas es un proceso con etapas concretas y transversal a distintas disciplinas: tiene que cubrir las expectativas de usuarios y clientes, y también las restricciones de contexto, infraestructura y presupuesto. Design Thinking modela ese proceso como una serie de etapas bien definidas — empatizar, definir, idear, prototipar y evaluar — con foco en la innovación.\n\nEl trabajo parte de una observación: las metodologías ágiles y tradicionales se concentran en la gestión del proyecto y suelen dejar afuera el proceso de diseño en sí, lo que impacta en el resultado y alimenta la deuda técnica. La propuesta sostiene que el diseño de un sistema necesita, además de una metodología de gestión, un marco metodológico propio orientado específicamente al diseño.\n\nSobre esa base se define un proceso de cinco fases — Información, Concepción, Construcción, Integración y Transición — donde construcción y transición se repiten de forma iterativa e incremental. El artículo describe el ámbito académico donde surge la propuesta, su implementación en el aula de Diseño de Sistemas y el plan de trabajo futuro.",
  archivo: "../assets/docs/conaiisi2017-design-thinking.pdf"
};

var ACTAS = {
  titulo: "Las ponencias quedan publicadas",
  texto: "Lo que se presenta no se pierde: los trabajos del CICE se publican en AJEA, el repositorio de Actas de Jornadas y Eventos Académicos de la UTN, con ISSN y DOI propios. El libro de actas del CICE 2025 ya está disponible en línea.",
  issn: "ISSN 2683-8818 · ISBN 978-950-42-0268-4",
  url: "https://rtyc.utn.edu.ar/index.php/ajea/issue/view/126",
  qr: "ajea-cice2025",
  foto: "../assets/fotos/congresos/cice2025-actas-ajea.jpg"
};

var GRADUADOS = {
  epigrafe: "Extensión Universitaria · Eje 2",
  titulo: "Vinculación con la comunidad graduada",
  intro: "Recibirse no es irse. La Universidad sostiene el vínculo con sus graduados de forma sistemática, y esa información vuelve como insumo para mejorar la carrera.",
  bloques: [
    {
      titulo: "Premio UTN a Personas Graduadas Destacadas",
      texto: "Un reconocimiento institucional, creado por la Ordenanza 2223, a las trayectorias de graduados que proyectan a la Universidad hacia afuera.",
      items: [
        "Desarrollo productivo industrial",
        "Impacto social y territorial",
        "Proyección internacional",
        "Innovación y emprendimiento",
        "Desarrollo científico",
        "Igualdad y mujeres en STEM",
        "Legado profesional"
      ],
      foto: "../assets/fotos/congresos/cice2026-premio-graduadas-destacadas.jpg"
    },
    {
      titulo: "Un sistema de datos para seguir las trayectorias",
      texto: "La vinculación no se apoya en anécdotas: hay una arquitectura de datos en tres fases que alimenta las decisiones académicas.",
      items: [
        "Captura: encuesta obligatoria de graduación, encuesta de trayectorias laborales cada tres años y encuesta a ámbitos empleadores",
        "Procesamiento: tablero institucional UTN centralizado más tableros locales por Facultad Regional",
        "Devolución: informes anuales consolidados y segmentados por carrera, con resultados abiertos a la comunidad"
      ],
      foto: "../assets/fotos/congresos/cice2026-sistema-datos-graduados.jpg"
    },
    {
      titulo: "Graduados que vuelven a dar clase",
      texto: "Buena parte del plantel docente son graduados de la propia Facultad que volvieron a las cátedras donde cursaron. Esa doble pertenencia — industria y aula — es lo que mantiene las materias conectadas con lo que pasa afuera.",
      items: [],
      foto: "../assets/fotos/congresos/cice2026-delegacion-frba.jpg"
    },
    {
      titulo: "Desarrollo Profesional",
      texto: "La Facultad tiene un área que acompaña las búsquedas laborales de estudiantes y graduados, con gestión de calidad certificada bajo ISO 9001.",
      items: [],
      url: "https://frba.utn.edu.ar/estudiantes/adp/",
      qr: "frba-desarrollo-profesional"
    }
  ]
};

var COOPERACION = {
  titulo: "La carrera no termina en la frontera",
  intro: "La internacionalización es una línea de gestión concreta de la UTN, con acciones que llegan hasta el plan de estudios y hasta el aula.",
  curriculumTitulo: "Internacionalización del currículum",
  curriculumFoto: "../assets/fotos/congresos/cice2026-internacionalizacion-curriculum.jpg",
  curriculumItems: [
    "Incorporar la internacionalización en los planes de estudio",
    "Clases espejo: cursar en simultáneo con estudiantes de una universidad del exterior",
    "Proyectos COIL dentro de las asignaturas: aprendizaje colaborativo internacional en línea",
    "Desarrollar e implementar un suplemento al título, para que la formación sea legible afuera",
    "Ampliar y fortalecer la oferta de cursos de idiomas extranjeros",
    "Vincular la investigación y el desarrollo con el contexto global"
  ],
  eventosTitulo: "Eventos internacionales inmersivos",
  eventosTexto: "Competencias y redes abiertas a estudiantes, donde se trabaja con equipos de otros países.",
  eventosFoto: "../assets/fotos/congresos/cice2026-eventos-internacionales.jpg",
  eventos: [
    { n: "Rally Latinoamericano de Innovación", d: "Competencia regional de innovación abierta: 28 horas, en equipos, con desafíos reales.", url: "https://www.rallydeinnovacion.org/" },
    { n: "ILAN · Israel Innovation Network", d: "Red de innovación con vinculación académica y empresarial.", url: "https://www.ilan.lat/" },
    { n: "PetroBowl Competition", d: "Competencia internacional de la Society of Petroleum Engineers para equipos universitarios.", url: "https://www.spe.org/en/students/petrobowl/" },
    { n: "Intercambio con el Tecnológico Nacional de México", d: "El CIIDET presentó su Modelo Dinámico de Aprendizaje Activo (MoDAA) en el CICE, en sesión híbrida con las regionales argentinas.", url: "" }
  ]
};

var FOTOS_CONGRESOS = [
  { img: "../assets/fotos/congresos/cice2026-plenaria-auditorio.jpg", titulo: "CICE 2026 · Plenaria", pie: "Auditorio de la Facultad Regional Bahía Blanca durante una sesión plenaria", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-delegacion-frba.jpg", titulo: "CICE 2026 · Delegación de la FRBA", pie: "Docentes y estudiantes de Buenos Aires acreditados en el congreso", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-poster-pobreza-tiempo.jpg", titulo: "CICE 2026 · Póster de la FRBA", pie: "\"Pobreza del tiempo en estudiantes universitarios de ingeniería\" — estudio longitudinal sobre trayectorias y deserción", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-poster-neurodiversidad.jpg", titulo: "CICE 2026 · Póster de la FRBA", pie: "Neurodiversidad y accesibilidad en la educación híbrida, presentado en la sesión de pósteres", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-mesa-ia-en-la-utn.jpg", titulo: "CICE 2026 · Mesa institucional", pie: "La IA en la UTN: potenciar la enseñanza en nuevos escenarios educativos", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-arquitectura-cognitiva.jpg", titulo: "CICE 2026 · Arquitectura cognitiva", pie: "Sistema tutor inteligente con mentor por IA y tutoría entre pares", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-pipeline-biologico.jpg", titulo: "CICE 2026 · El pipeline del aprendizaje", pie: "De la percepción a la acción, con la metacognición monitoreando el proceso", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-problema-dos-sigma.jpg", titulo: "CICE 2026 · El problema Dos Sigma", pie: "La brecha del 98% entre la clase estándar y la tutoría uno a uno", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-tutores-estudiantiles.jpg", titulo: "CICE 2026 · Tutoras y tutores estudiantiles", pie: "Experiencias de construcción de comunidad y sentido de pertenencia", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-relato-reiniciando-sistema.jpg", titulo: "CICE 2026 · Relato estudiantil", pie: "\"Reiniciando el sistema\": el valor de una trayectoria universitaria no lineal", autorizado: true },
  { img: "../assets/fotos/congresos/cice2026-grupo-bahia-blanca.jpg", titulo: "CICE 2026 · La delegación completa", pie: "Participantes de distintas regionales, en el puerto de Bahía Blanca", autorizado: true },
  { img: "../assets/fotos/congresos/cice2025-apertura-la-plata.jpg", titulo: "CICE 2025 · Apertura", pie: "Acto inaugural en la Facultad Regional La Plata, sede de la 4.ª edición", autorizado: true },
  { img: "../assets/fotos/congresos/cice2025-poster-laboratorio-remoto.jpg", titulo: "CICE 2025 · Laboratorio remoto de automatización", pie: "Práctica de automatización industrial a distancia: aprender haciendo desde cualquier parte del mundo", autorizado: true },
  { img: "../assets/fotos/congresos/cice2025-aula-participantes.jpg", titulo: "CICE 2025 · Sesión de trabajo", pie: "Modalidad híbrida: participantes en el aula y en pantalla al mismo tiempo", autorizado: true },
  { img: "../assets/fotos/congresos/cice2025-actas-ajea.jpg", titulo: "CICE 2025 · Libro de actas", pie: "Publicado en AJEA, el repositorio de actas académicas de la UTN", autorizado: true },
  { img: "../assets/fotos/congresos/cice2024-delegacion-chubut.jpg", titulo: "CICE 2024 · Facultad Regional Chubut", pie: "Equipo presentador en la 3.ª edición del congreso", autorizado: true },
  { img: "../assets/fotos/congresos/cice2024-modaa-mexico.jpg", titulo: "CICE 2024 · Intercambio con México", pie: "Modelo Dinámico de Aprendizaje Activo, del CIIDET · Tecnológico Nacional de México", autorizado: true },
  { img: "../assets/fotos/congresos/cice2024-taller-cinco-mentes.jpg", titulo: "CICE 2024 · Taller magistral", pie: "\"Enseñar para las 5 mentes del futuro\", para docentes y estudiantes con vocación docente", autorizado: true },
  { img: "../assets/fotos/congresos/cice2024-taller-prompting.jpg", titulo: "CICE 2024 · Taller de prompting", pie: "Potenciando el uso de la IA generativa en la enseñanza", autorizado: true },
  { img: "../assets/fotos/congresos/cice2024-equipos-multifuncionales.jpg", titulo: "CICE 2024 · Equipos multifuncionales", pie: "Presentación sobre prácticas ágiles y distribución de habilidades en equipos", autorizado: true },
  { img: "../assets/fotos/congresos/cice2024-ponencia-matematica.jpg", titulo: "CICE 2024 · Ponencia", pie: "Experiencia de aula sobre ecuaciones, inecuaciones y valor absoluto", autorizado: true }
];
