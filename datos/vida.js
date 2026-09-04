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
  { img: "../assets/fotos/institucional/evento-carpa.jpg", titulo: "Evento institucional", pie: "COMPLETAR: no pude identificar de qué acto es esta foto" }
];
