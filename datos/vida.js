/* ══════════════════════════════════════════════════════════════════
   datos/vida.js — Vida estudiantil y testimonios

   ⚠ SOBRE LOS EMBEDS DE LINKEDIN — leer antes de tocar esto.

   LinkedIn permite embeber una publicación con esta URL:
     https://www.linkedin.com/embed/feed/update/<URN>
   donde <URN> sale de la URL del post original:
     .../activity-7479892072527826946-XXXX  → urn:li:activity:7479892072527826946
     .../ugcPost-7494408482893348866-XXXX   → urn:li:ugcPost:7494408482893348866
     .../share-7489070448979132416-XXXX     → urn:li:share:7489070448979132416

   PERO: el iframe carga desde los servidores de LinkedIn. Sin internet
   NO SE VE NADA. El día de la Expo la conectividad no está garantizada,
   así que cada testimonio tiene además "respaldo": una captura local y
   un texto. El módulo muestra el respaldo por defecto e intenta el
   embed solo si detecta conexión.

   ⚠ AUTORÍA E IMAGEN: que un posteo sea público no es lo mismo que
   tener autorización para exhibirlo en un stand institucional. Antes
   del 16/09 hay que pedirle el OK por escrito a cada persona.
   Marcá "autorizado: true" recién cuando lo tengas.
   ══════════════════════════════════════════════════════════════════ */

var TESTIMONIOS = [
  {
    persona: "Publicación institucional UTN Buenos Aires",
    rol: "Designaciones docentes",
    urn: "urn:li:activity:7479892072527826946",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7479892072527826946/",
    qr: "li-designaciones",
    respaldo: "La Facultad impulsa las designaciones docentes.",
    captura: "",              // ← ruta a la captura en /assets/fotos/linkedin/
    autorizado: true          // institucional propio
  },
  {
    persona: "Publicación de la comunidad",
    rol: "Actividad del Departamento",
    urn: "urn:li:activity:7494157601027452928",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7494157601027452928/",
    qr: "li-actividad-2",
    respaldo: "Completar con el texto o la captura de la publicación.",
    captura: "",
    autorizado: false
  },
  {
    persona: "Lucas Affre",
    rol: "Graduado",
    urn: "urn:li:ugcPost:7494408482893348866",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7494408482893348866/",
    qr: "li-affre",
    respaldo: "Después de años de estudio, llegó el día de recibirse.",
    captura: "",
    autorizado: false
  },
  {
    persona: "Nicolás Ariel Molina",
    rol: "Estudiante · Sistemas Operativos",
    urn: "urn:li:ugcPost:7491554651209793536",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7491554651209793536/",
    qr: "li-molina",
    respaldo: "Experiencia cursando Sistemas Operativos en la carrera.",
    captura: "",
    autorizado: false
  },
  {
    persona: "Leonel Cantero",
    rol: "Estudiante · Ingeniería en Sistemas",
    urn: "urn:li:share:7489070448979132416",
    url: "https://www.linkedin.com/posts/leonel-cantero-2728951b7_utnba-ingenieriaensistemas-share-7489070448979132416-R64-",
    qr: "li-cantero",
    respaldo: "Experiencia de cursada en UTN.BA.",
    captura: "",
    autorizado: false
  }
];

/* ── Se recibe gente ────────────────────────────────────────────
   ⚠ Todas estas fotos tienen personas identificables. No publicar
   sin autorización individual. Poner autorizado: true una por una. */
var GRADUACIONES = [
  { img: "../assets/fotos/graduacion/egresada-banda.jpg", titulo: "Nueva ingeniera", pie: "Con docentes de la carrera, en el pasillo del laboratorio", autorizado: false },
  { img: "../assets/fotos/graduacion/egresada-festejo.jpg", titulo: "El festejo clásico", pie: "Espuma, bengalas y el cartel de \"Soy Ingeniera\" en la puerta de la Facultad", autorizado: false }
];

/* ── Aulas y espacios ───────────────────────────────────────────
   Cargá acá las fotos de aulas, laboratorios y espacios comunes. */
var ESPACIOS = [
  { img: "../assets/fotos/aulas/aula-clase-teorica.jpg", titulo: "Clase teórica", pie: "Aula grande de la Facultad, en plena cursada" },
  { img: "../assets/fotos/aulas/aula-examen.jpg", titulo: "Día de parcial", pie: "Aula de comisión, evaluación en curso" },
  { img: "../assets/fotos/institucional/evento-carpa.jpg", titulo: "Evento institucional", pie: "Acto en la Facultad" }
];

/* ── Testimonios en video ──────────────────────────────────────────
   Ocho videos de la cátedra de Dirección Estratégica: uno del docente
   y siete de estudiantes.

   Los nombres están vacíos a propósito: no los inventé. Se completan
   desde el modo edición, y hasta entonces la tarjeta muestra solo el
   video. Un nombre equivocado abajo de la cara de alguien es peor que
   ningún nombre.

   El video 005 está filmado en vertical con un celular. El módulo lo
   detecta y lo muestra con la proporción que le corresponde en vez de
   recortarlo.                                                          */
var VIDEO_TESTIMONIOS = {
  titulo: "Lo cuentan ellos",
  intro: "Ocho minutos de gente que ya cursó, hablando a cámara. " +
         "Primero la cátedra, después los estudiantes.",
  destacado: {
    src: "../assets/video/direst-001.mp4",
    poster: "../assets/video/direst-001-poster.jpg",
    nombre: "",
    rol: "Docente · Dirección Estratégica",
    pie: "59 s"
  },
  videos: [
    { src: "../assets/video/direst-002.mp4", poster: "../assets/video/direst-002-poster.jpg", nombre: "", rol: "Estudiante", pie: "53 s" },
    { src: "../assets/video/direst-003.mp4", poster: "../assets/video/direst-003-poster.jpg", nombre: "", rol: "Estudiante", pie: "51 s" },
    { src: "../assets/video/direst-004.mp4", poster: "../assets/video/direst-004-poster.jpg", nombre: "", rol: "Estudiante", pie: "40 s" },
    { src: "../assets/video/direst-005.mp4", poster: "../assets/video/direst-005-poster.jpg", nombre: "", rol: "Estudiante", pie: "41 s", vertical: true },
    { src: "../assets/video/direst-006.mp4", poster: "../assets/video/direst-006-poster.jpg", nombre: "", rol: "Estudiante", pie: "49 s" },
    { src: "../assets/video/direst-007.mp4", poster: "../assets/video/direst-007-poster.jpg", nombre: "", rol: "Estudiante", pie: "56 s" },
    { src: "../assets/video/direst-008.mp4", poster: "../assets/video/direst-008-poster.jpg", nombre: "", rol: "Estudiante", pie: "42 s" }
  ]
};

/* ── Concursos y competencias ──────────────────────────────────────
   Lo que pasa alrededor de la cursada: competencias donde se programa
   contra reloj y en equipo. Es de las cosas que más engancha a un
   ingresante y no aparece en ningún plan de estudios.

   `alcance` distingue lo que organiza la comunidad del lenguaje Wollok
   (usado en las materias de programación de los primeros años) de los
   hackathons abiertos, que son de terceros y no dependen de la UTN.   */
var CONCURSOS = [
  {
    nombre: "Concurso Wollok",
    alcance: "Comunidad Wollok",
    texto: "Wollok es el lenguaje con el que se aprende a programar con objetos en los primeros años. " +
           "Su comunidad organiza un concurso donde los equipos resuelven un desafío de diseño y programación. " +
           "Es la competencia más cercana a lo que ya estás cursando: no hace falta saber nada de afuera de la materia.",
    url: "https://www.wollok.org/news/concurso2025/",
    etiqueta: "Edición 2025"
  },
  {
    nombre: "Hackathons",
    alcance: "Abierto, organizadores externos",
    texto: "Maratones de 24 a 48 horas donde un equipo arma algo que funcione, de cero, contra reloj. " +
           "Se sale con un prototipo, con gente nueva conocida y con una idea bastante exacta de cómo es " +
           "trabajar bajo presión. Muchos son gratuitos y aceptan estudiantes de cualquier año.",
    url: "https://ar.allhackathons.com/",
    etiqueta: "Calendario argentino"
  }
];
