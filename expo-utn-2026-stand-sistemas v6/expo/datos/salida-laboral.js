/* ══════════════════════════════════════════════════════════════════
   datos/salida-laboral.js

   CRITERIO EDITORIAL FIJADO: se nombran empresas en texto plano,
   sin logos ni isotipos. La universidad es pública y no corresponde
   dar señal de auspicio ni usar marcas registradas de terceros.
   Si alguien pide agregar un logo, la respuesta es no.

   Las empresas listadas son ejemplos del tipo de organización que
   contrata cada perfil, no un ranking ni una bolsa de trabajo.
   ══════════════════════════════════════════════════════════════════ */

/* ── Niveles de desarrollador ───────────────────────────────────
   Escala de seniority reescrita para el formato del sitio.        */
var NIVELES_DEV = [
  {
    nivel: "Junior",
    color: "var(--a1)",
    resumen: "Aprende haciendo, con red de contención.",
    items: [
      "Trabaja con supervisión de alguien más experimentado.",
      "Maneja conocimientos básicos de software y hardware.",
      "Programa con soltura en al menos un lenguaje.",
      "Participa en la planificación inicial del proyecto.",
      "Se ocupa de funciones y herramientas internas del sistema."
    ]
  },
  {
    nivel: "Semi Senior",
    color: "var(--a2)",
    resumen: "Ya se maneja solo en el ciclo completo.",
    items: [
      "Resuelve tareas técnicas con poca supervisión.",
      "Conoce todas las etapas: análisis, desarrollo, prueba, implementación y documentación.",
      "Arma su propio ambiente de desarrollo.",
      "Detecta errores de código y los deja más eficientes.",
      "Escribe pruebas unitarias."
    ]
  },
  {
    nivel: "Senior",
    color: "var(--a3)",
    resumen: "Decide, dirige y forma a los demás.",
    items: [
      "Supervisa y dirige equipos.",
      "Comprende el alcance completo de un proyecto y define cómo desarrollarlo, probarlo, implementarlo y mantenerlo.",
      "Asesora a desarrolladores junior y semi senior.",
      "Hace revisiones periódicas de código.",
      "Mejora la calidad y la estructura del código del equipo."
    ]
  }
];

/* ── Perfiles profesionales ─────────────────────────────────────
   Agregá o sacá perfiles editando esta lista.                     */
var PERFILES = [
  {
    id: "desarrollo",
    nombre: "Desarrollo de software",
    color: "var(--a1)",
    resumen: "Construir el sistema. Es la salida más conocida y también la más amplia.",
    descripcion: "El desarrollador traduce un problema en código que funciona, se puede mantener y no se " +
      "cae. Abarca backend, frontend, mobile, sistemas embebidos e infraestructura. La carrera no te forma " +
      "en un lenguaje puntual: te forma en paradigmas, algoritmos y arquitectura, que es lo que sigue " +
      "sirviendo cuando el lenguaje de moda cambia.",
    materias: [6, 14, 20, 23, 25],
    empresas: ["Mercado Libre", "Globant", "Despegar", "Accenture", "Santander Tecnología", "Ualá", "Tiendanube", "Naranja X"],
    nivelesDev: true
  },
  {
    id: "analista",
    nombre: "Analista funcional",
    color: "var(--a2)",
    resumen: "Traducir entre las personas que tienen el problema y las que escriben el código.",
    descripcion: "Releva qué necesita realmente la organización, lo modela y lo documenta de forma que el " +
      "equipo técnico pueda construirlo. Es un rol de escucha, modelado y negociación: mucha entrevista, " +
      "mucho diagrama y mucha decisión sobre qué entra y qué no entra en el alcance.",
    materias: [8, 16, 23],
    empresas: ["Consultoras de sistemas", "Bancos y aseguradoras", "Organismos públicos", "Empresas de retail y logística"]
  },
  {
    id: "qa",
    nombre: "QA y QC",
    color: "var(--a3)",
    resumen: "Que el sistema haga lo que dice hacer, antes de que lo descubra el usuario.",
    descripcion: "Control de calidad (QC) verifica el producto terminado; aseguramiento de calidad (QA) " +
      "trabaja sobre el proceso para que los errores no lleguen a existir. Incluye diseño de casos de " +
      "prueba, automatización, pruebas de carga y seguridad, y métricas de calidad.",
    materias: [20, 25],
    empresas: ["Empresas de testing tercerizado", "Fintech", "Áreas de calidad de bancos", "Software factories"]
  },
  {
    id: "datos",
    nombre: "Ingeniería de datos, machine learning y ciencia de datos",
    color: "var(--a4)",
    resumen: "Convertir datos en decisiones. Tres roles distintos que suelen confundirse.",
    descripcion: "El ingeniero de datos construye las cañerías: pipelines, almacenamiento y disponibilidad. " +
      "El científico de datos modela y explica lo que ahí adentro está pasando. El ingeniero de machine " +
      "learning lleva esos modelos a producción y los mantiene vivos. Los tres se apoyan fuerte en " +
      "estadística y bases de datos.",
    materias: [17, 19, 28, 31, 32],
    empresas: ["Mercado Libre", "Globant", "Telecom", "Bancos", "Consultoras de analítica", "Startups de IA"]
  },
  {
    id: "ciberseguridad",
    nombre: "Ciberseguridad y peritaje informático",
    color: "var(--a5)",
    resumen: "Proteger sistemas, y cuando algo pasa, reconstruir qué pasó.",
    descripcion: "Va desde el pentesting y la defensa de infraestructura crítica hasta la informática " +
      "forense, donde el trabajo tiene valor probatorio ante la Justicia. El perito informático es una " +
      "salida menos conocida y con demanda creciente: requiere criterio técnico y también entender el " +
      "marco legal.",
    materias: [15, 21, 26, 35, 24],
    empresas: ["Bancos y fintech", "Empresas de ciberseguridad", "Poder Judicial y fuerzas de seguridad", "Consultoras de auditoría", "Telecomunicaciones"]
  },
  {
    id: "gestion",
    nombre: "Liderazgo de proyectos y producto",
    color: "var(--a1)",
    resumen: "Coordinar personas, plazos y prioridades para que el sistema exista.",
    descripcion: "El líder de proyecto se ocupa del cómo: equipo, cronograma, riesgos y presupuesto. El " +
      "product owner se ocupa del qué y del para quién: define prioridades y defiende el valor de lo que " +
      "se construye. Son roles a los que se suele llegar después de años en lo técnico.",
    materias: [30, 34, 25],
    empresas: ["Software factories", "Áreas de sistemas de grandes empresas", "Startups", "Consultoras"]
  },
  {
    id: "arquitectura",
    nombre: "Arquitectura de software y hardware",
    color: "var(--a2)",
    resumen: "Decidir la forma del sistema antes de que se escriba una línea.",
    descripcion: "El arquitecto define la estructura, los patrones, las tecnologías y las restricciones " +
      "que van a condicionar todo el desarrollo posterior. Es donde más pesa la formación de ingeniería: " +
      "no alcanza con saber programar, hay que poder justificar por qué esta solución y no otra, y " +
      "convivir con las consecuencias.",
    materias: [23, 25, 7, 26],
    empresas: ["Grandes empresas de tecnología", "Bancos", "Telecomunicaciones", "Consultoras de arquitectura cloud"]
  },
  {
    id: "diseno",
    nombre: "Diseño de experiencia e interacción",
    color: "var(--a3)",
    resumen: "Que el sistema se entienda sin manual.",
    descripcion: "Diseño de interacción, arquitectura de la información y experiencia de usuario. La " +
      "carrera lo aborda desde el diseño del sistema: un sistema técnicamente impecable que nadie puede " +
      "usar es un sistema que falló.",
    materias: [23, 16],
    empresas: ["Estudios de diseño de producto", "Áreas de producto digital", "Agencias", "Startups"]
  },
  {
    id: "docencia",
    nombre: "Docencia universitaria",
    color: "var(--a4)",
    resumen: "Formar a la camada que viene.",
    descripcion: "Buena parte del plantel de la carrera son graduados de la propia Facultad que volvieron " +
      "a dar clase. Se suele empezar como auxiliar o ayudante mientras se trabaja en la industria, y esa " +
      "doble pertenencia es justamente lo que mantiene las materias conectadas con la realidad.",
    materias: [],
    empresas: ["UTN y otras universidades nacionales", "Institutos terciarios", "Formación corporativa"]
  },
  {
    id: "investigacion",
    nombre: "Investigación y desarrollo",
    color: "var(--a5)",
    resumen: "Producir conocimiento nuevo, no solo aplicar el existente.",
    descripcion: "Grupos de investigación, becas, proyectos de extensión y publicación en congresos. Se " +
      "puede empezar como estudiante: hay convocatorias y becas específicas para alumnos, y congresos " +
      "con formato de presentación pensado para estudiantes.",
    materias: [],
    empresas: ["Grupos de investigación de la UTN", "CONICET", "Áreas de I+D de empresas", "Universidades del exterior"]
  }
];
