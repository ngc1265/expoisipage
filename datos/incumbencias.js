/* ══════════════════════════════════════════════════════════════════
   datos/incumbencias.js — sección "Incumbencias y áreas"

   Se dibuja como GRAFO: raíz → áreas → puestos.
   Cada nodo se abre tocándolo; el panel de la derecha muestra la ficha.

   ┌────────────────────────────────────────────────────────────────┐
   │ DIVISIÓN DE TRABAJO CON "SALIDA LABORAL" — leer antes de tocar │
   │                                                                │
   │ Incumbencias  = EL MAPA. Qué campos existen, qué autoriza el   │
   │                 título, y qué puestos concretos cuelgan de cada │
   │                 área. Vista panorámica, fichas cortas.          │
   │ Salida laboral= LA FICHA. Diez perfiles desarrollados en        │
   │                 profundidad, con escala de seniority y empresas.│
   │                                                                │
   │ El campo `perfil` de cada puesto apunta al id de un perfil de   │
   │ datos/salida-laboral.js. Así las dos secciones se enlazan en    │
   │ vez de repetirse. Si agregás un puesto nuevo, poné el `perfil`  │
   │ que le corresponda (o "" si no hay ficha todavía).              │
   └────────────────────────────────────────────────────────────────┘

   Campos de área:   id, nombre, color, resumen, alcance
   Campos de puesto: nombre, quehace, materias[], perfil, _pendiente
   ══════════════════════════════════════════════════════════════════ */

var RAIZ = {
  nombre: "Ingeniería en Sistemas de Información",
  resumen: "Un título, muchos caminos. Tocá un área para abrirla y después cualquier puesto para ver qué se hace ahí.",
  _pendiente: ""
};

var AREAS = [
  {
    id: "desarrollo",
    nombre: "Desarrollo de software",
    color: "var(--a1)",
    resumen: "Construir el sistema: que funcione, que se pueda mantener y que no se caiga.",
    alcance: "Diseñar, desarrollar, implementar y mantener sistemas de información y software de aplicación.",
    puestos: [
      { nombre: "Desarrollador backend", quehace: "Escribe la lógica y los servicios que están detrás de lo que se ve: reglas de negocio, APIs, integraciones con otros sistemas.", materias: [6, 14, 19, 20, 23], perfil: "desarrollo" },
      { nombre: "Desarrollador frontend", quehace: "Construye la parte con la que la persona interactúa. Además de código, decide accesibilidad, rendimiento y comportamiento en pantalla.", materias: [6, 14, 20, 23], perfil: "desarrollo" },
      { nombre: "Desarrollador mobile", quehace: "Aplicaciones para celular, con las restricciones propias del dispositivo: batería, red intermitente, permisos, tiendas de apps.", materias: [14, 20, 23], perfil: "desarrollo" },
      { nombre: "Desarrollador de sistemas embebidos", quehace: "Software que corre dentro de un aparato — un colectivo, un molinete, una máquina de la fábrica. Muy cerca del hardware.", materias: [7, 15, 29], perfil: "desarrollo" },
      { nombre: "Ingeniero de plataforma / DevOps", quehace: "Arma el camino entre el código escrito y el sistema andando: automatización, despliegues, monitoreo, que el equipo pueda entregar sin romper nada.", materias: [15, 20, 26], perfil: "desarrollo" }
    ]
  },
  {
    id: "datos",
    nombre: "Datos e inteligencia artificial",
    color: "var(--a2)",
    resumen: "Convertir datos sueltos en algo que se pueda usar para decidir o para automatizar.",
    alcance: "Diseñar y administrar bases de datos, sistemas de información y modelos para el tratamiento de la información.",
    puestos: [
      { nombre: "Data engineer", quehace: "Construye las cañerías: de dónde salen los datos, cómo llegan, cómo se limpian y dónde quedan disponibles. Sin esto, lo demás no existe.", materias: [19, 20, 32], perfil: "datos" },
      { nombre: "Data analyst", quehace: "Responde preguntas del negocio con los datos que hay. Mide, compara, arma tableros y explica qué está pasando y por qué.", materias: [17, 19, 32], perfil: "datos" },
      { nombre: "Data scientist", quehace: "Construye modelos que predicen o clasifican. Trabaja con estadística, experimentación y validación: la parte difícil no es entrenar, es saber si sirve.", materias: [17, 31, 32], perfil: "datos" },
      { nombre: "Machine learning engineer", quehace: "Lleva un modelo del cuaderno de laboratorio a producción, y lo mantiene funcionando cuando los datos cambian.", materias: [28, 31, 32], perfil: "datos" },
      { nombre: "Especialista en IA aplicada", quehace: "Integra modelos de lenguaje y visión en productos existentes, y define hasta dónde se les puede confiar una decisión.", materias: [31, 32], perfil: "datos", _pendiente: "Confirmar qué electivas de la carrera cubren este puesto." }
    ]
  },
  {
    id: "ciberseguridad",
    nombre: "Ciberseguridad y pericia informática",
    color: "var(--a3)",
    resumen: "Proteger sistemas, y cuando algo ya pasó, reconstruir qué pasó y poder probarlo.",
    alcance: "Estudiar la factibilidad y auditar sistemas de información; realizar arbitrajes, peritajes y tasaciones sobre sistemas.",
    puestos: [
      { nombre: "Analista de seguridad (Blue team)", quehace: "Defiende: monitorea, detecta lo raro, responde incidentes y cierra lo que quedó abierto.", materias: [26, 35], perfil: "ciberseguridad" },
      { nombre: "Pentester (Red team)", quehace: "Ataca los sistemas propios, con autorización escrita, para encontrar los agujeros antes que otro. El permiso es lo que separa esto de un delito.", materias: [15, 26, 35], perfil: "ciberseguridad" },
      { nombre: "Perito informático", quehace: "Trabaja para la Justicia: recupera evidencia digital, la preserva sin alterarla y produce un informe que se sostiene en un juicio.", materias: [24, 35], perfil: "ciberseguridad" },
      { nombre: "Auditor de sistemas", quehace: "Revisa que los sistemas y los procesos cumplan lo que dicen cumplir: controles, normativa, trazabilidad.", materias: [16, 25, 30], perfil: "ciberseguridad" },
      { nombre: "Especialista en gobierno de datos y privacidad", quehace: "Define quién puede ver qué, cómo se guarda y cuánto tiempo. Cruce de técnica, normativa y sentido común.", materias: [19, 24, 35], perfil: "ciberseguridad", _pendiente: "" }
    ]
  },
  {
    id: "gestion",
    nombre: "Gestión de proyectos y producto",
    color: "var(--a4)",
    resumen: "Que el sistema correcto se construya, a tiempo, con la gente y la plata que hay.",
    alcance: "Dirigir y controlar proyectos de sistemas de información; planificar, organizar y evaluar su implementación.",
    puestos: [
      { nombre: "Project leader", quehace: "Conduce el proyecto: alcance, plazos, riesgos, equipo. Su trabajo se nota cuando nada explota.", materias: [23, 30, 36], perfil: "gestion" },
      { nombre: "Product owner", quehace: "Decide qué se construye y en qué orden. Es la persona que dice que no, con argumentos.", materias: [8, 16, 30], perfil: "gestion" },
      { nombre: "Scrum master / Agile coach", quehace: "Trabaja sobre cómo trabaja el equipo: destraba, mide, ajusta el proceso. No manda sobre el producto.", materias: [23, 30], perfil: "gestion" },
      { nombre: "Consultor de sistemas", quehace: "Entra a una organización que no conoce, entiende el problema rápido y propone qué hacer. Mucha entrevista, mucho diagnóstico.", materias: [8, 16, 33], perfil: "gestion" },
      { nombre: "Emprendedor / fundador técnico", quehace: "Arma su propio producto. La carrera aporta lo que casi nadie tiene al empezar: saber estimar, diseñar y no quedarse pegado a una tecnología.", materias: [18, 30, 34], perfil: "gestion", _pendiente: "" }
    ]
  },
  {
    id: "analisis",
    nombre: "Análisis y procesos",
    color: "var(--a5)",
    resumen: "Traducir entre quienes tienen el problema y quienes escriben el código.",
    alcance: "Relevar, analizar y modelar los procesos de una organización y especificar los requerimientos de sus sistemas.",
    puestos: [
      { nombre: "Analista funcional", quehace: "Releva qué necesita la organización, lo modela y lo escribe de forma que el equipo técnico pueda construirlo sin adivinar.", materias: [8, 16, 23], perfil: "analista" },
      { nombre: "Analista de procesos (BPM)", quehace: "Mira cómo trabaja hoy la organización, encuentra dónde se pierde tiempo y rediseña el circuito. A veces la solución ni siquiera es un sistema.", materias: [8, 16, 33], perfil: "analista" },
      { nombre: "Business analyst", quehace: "Conecta la estrategia del negocio con lo que se puede construir. Justifica inversiones y mide si dieron resultado.", materias: [18, 30, 34], perfil: "analista" },
      { nombre: "Especialista en transformación digital", quehace: "Acompaña a una organización que cambia su forma de trabajar. Lo difícil no es la tecnología: es la gente.", materias: [8, 30, 33], perfil: "analista", _pendiente: "" }
    ]
  },
  {
    id: "calidad",
    nombre: "Calidad y testing",
    color: "var(--a1)",
    resumen: "Que lo que se entrega haga lo que dice hacer, y que se pueda demostrar.",
    alcance: "Verificar y certificar el funcionamiento de sistemas de información y evaluar su calidad.",
    puestos: [
      { nombre: "QA analyst", quehace: "Diseña los casos de prueba, los ejecuta y define si el producto está listo para salir. Rompe cosas a propósito.", materias: [25], perfil: "qa" },
      { nombre: "QA automation engineer", quehace: "Escribe código cuyo único trabajo es probar otro código, y lo mete en el pipeline para que corra solo en cada cambio.", materias: [20, 25], perfil: "qa" },
      { nombre: "Ingeniero de performance", quehace: "Mide cuánto aguanta el sistema y dónde se rompe antes de que se rompa con usuarios reales adentro.", materias: [25, 28], perfil: "qa" },
      { nombre: "Quality control / mejora de procesos", quehace: "Trabaja sobre el proceso de desarrollo, no sobre el producto: métricas, estándares, normas de calidad.", materias: [25, 30], perfil: "qa", _pendiente: "" }
    ]
  },
  {
    id: "infraestructura",
    nombre: "Infraestructura, redes y arquitectura",
    color: "var(--a2)",
    resumen: "Lo que sostiene todo lo demás: dónde corre, cómo se conecta, cómo escala.",
    alcance: "Diseñar, dirigir y evaluar la implementación de la infraestructura tecnológica y las redes de una organización.",
    puestos: [
      { nombre: "Arquitecto de software", quehace: "Toma las decisiones estructurales que después son carísimas de revertir: cómo se divide el sistema, cómo hablan las partes, qué se banca cada una.", materias: [20, 23, 30], perfil: "arquitecto" },
      { nombre: "Arquitecto de infraestructura / cloud", quehace: "Diseña dónde vive el sistema: servidores, nube, redes, costos. Equilibra disponibilidad contra presupuesto.", materias: [15, 26, 35], perfil: "arquitecto" },
      { nombre: "Administrador de redes", quehace: "Mantiene la red funcionando y segura: enrutamiento, segmentación, capacidad, diagnóstico cuando algo anda lento.", materias: [21, 26], perfil: "arquitecto" },
      { nombre: "SRE (Site Reliability Engineer)", quehace: "Se ocupa de que el sistema siga en pie: monitoreo, guardias, análisis de incidentes y trabajo para que no se repitan.", materias: [15, 26], perfil: "arquitecto", _pendiente: "" }
    ]
  },
  {
    id: "diseno",
    nombre: "Diseño de experiencia",
    color: "var(--a4)",
    resumen: "Que el sistema se entienda sin manual y sirva a la persona que lo usa.",
    alcance: "Participar en el diseño de la interacción entre las personas y los sistemas de información.",
    puestos: [
      { nombre: "Diseñador UX", quehace: "Investiga cómo trabaja la gente, prueba prototipos con usuarios reales y corrige antes de que se escriba una línea de código.", materias: [8, 16, 23], perfil: "disenador" },
      { nombre: "Diseñador de interacción / UI", quehace: "Define el comportamiento y la forma de la interfaz: qué pasa cuando tocás cada cosa, y qué pasa cuando algo falla.", materias: [16, 23], perfil: "disenador" },
      { nombre: "Especialista en accesibilidad", quehace: "Se asegura de que el sistema también funcione para quien no ve, no oye o no puede usar un mouse. Además de ser lo correcto, en muchos casos es obligación legal.", materias: [16, 23, 24], perfil: "disenador", _pendiente: "" }
    ]
  },
  {
    id: "academia",
    nombre: "Docencia e investigación",
    color: "var(--a3)",
    resumen: "Producir conocimiento nuevo y formar a quienes vienen atrás.",
    alcance: "Participar en actividades de docencia, investigación, desarrollo y transferencia tecnológica.",
    puestos: [
      { nombre: "Docente universitario", quehace: "Da clase, arma material, evalúa y forma parte de una cátedra. Se puede empezar como ayudante mientras se cursa.", materias: [23, 30], perfil: "docencia" },
      { nombre: "Investigador", quehace: "Trabaja en un grupo de I+D sobre un problema abierto, publica en congresos y revistas, y somete lo que hace a revisión de pares.", materias: [28, 36], perfil: "investigacion" },
      { nombre: "Tutor / apoyo académico", quehace: "Acompaña a estudiantes de los primeros años, que es donde se define si alguien sigue o abandona.", materias: [], perfil: "docencia" },
      { nombre: "Extensión y transferencia", quehace: "Lleva lo que se produce en la Facultad a organizaciones, municipios y empresas que lo necesitan.", materias: [], perfil: "investigacion", _pendiente: "" }
    ]
  }
];

/* ── Alcances del título ────────────────────────────────────────
   ⚠ Los textos `alcance` de arriba son una REDACCIÓN DE DIVULGACIÓN
   escrita para el stand. NO son la transcripción literal de la
   resolución ministerial. Antes del 16/09 hay que reemplazarlos por
   el texto oficial de alcances del título de Ingeniero en Sistemas
   de Información, o dejar claro en pantalla que son una paráfrasis. */
var NOTA_LEGAL = {
  titulo: "Sobre este mapa",
  texto: "Las áreas y los puestos son una guía de orientación, no una lista cerrada. " +
         "Los alcances formales del título los fija la resolución ministerial correspondiente.",
  _pendiente: "Traer el texto oficial de alcances/incumbencias del título (resolución ministerial) y reemplazar las paráfrasis de cada área."
};
