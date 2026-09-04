/* ══════════════════════════════════════════════════════════════════
   datos/proyectos.js — Pósters de Proyecto Final

   Los pósters vienen del archivo del Departamento. Cada uno se
   guardó en dos tamaños:
     assets/proyectos/mini/<slug>.webp   ~30 KB  → grilla
     assets/proyectos/full/<slug>.webp  ~100 KB  → al abrirlo

   ⚠ Los originales pesaban 193 MB en total. Se recomprimieron a 7 MB
   sin recortar nada: el póster completo se sigue leyendo al abrirlo.
   NO reemplaces estos archivos por los originales sin leer antes la
   nota sobre la cuota de transferencia de Firebase en LEEME.md.

   ⚠ AUTORÍA: varios pósters tienen nombres de alumnos y docentes a
   la vista. Antes del 16/09 hay que confirmar con el Departamento
   qué se puede exhibir. Poné autorizado: true uno por uno.

   Campos: titulo, anio, comision, mini, full, resumen, autores,
           autorizado, _pendiente
   ══════════════════════════════════════════════════════════════════ */

var PROYECTOS = [
  {
    titulo: "",
    anio: 2026,
    comision: "K5153",
    mini: "../assets/proyectos/mini/proyecto-final-2026-jueves-k5153-grupo-456-poster-con-docent.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-jueves-k5153-grupo-456-poster-con-docent.webp",
    resumen: "",
    autores: "",
    autorizado: false,
    _pendiente: "FALTA: identificar el proyecto (el archivo solo dice comisión y grupo 456)"
  },
  {
    titulo: "",
    anio: 2026,
    comision: "K5051",
    mini: "../assets/proyectos/mini/proyecto-final-2026-martes-k5051-poster-25-08-2026.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-martes-k5051-poster-25-08-2026.webp",
    resumen: "",
    autores: "",
    autorizado: false,
    _pendiente: "FALTA: identificar el proyecto (el archivo solo dice comisión y fecha)"
  },
  {
    titulo: "Ad Sight",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-ad-sight.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-ad-sight.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Attentix",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-poster-attentix-grupo-454-2026-version-b.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-poster-attentix-grupo-454-2026-version-b.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Enerscope",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-poster-enerscope.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-poster-enerscope.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Guiarte",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-poster-guiarte.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-poster-guiarte.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "INFRABOT",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-poster-infrabot.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-poster-infrabot.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "MACE",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-mace-poster.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-mace-poster.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Optimizador de Rutas de Trabajo",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-optimizador-de-rutas-de-trabajo.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-optimizador-de-rutas-de-trabajo.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "PRISMA",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-prisma-poster-v2.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-prisma-poster-v2.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Switch Forge",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-poster-switch-forge.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-poster-switch-forge.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "SyntaxLearn",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-syntaxlearn.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-syntaxlearn.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "VictoriaX",
    anio: 2026,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2026-victoriax-poster-v1-0.webp",
    full: "../assets/proyectos/full/proyecto-final-2026-victoriax-poster-v1-0.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "ASTRA",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-astra.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-astra.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Cattle Tracker",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-cattle-tracker.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-cattle-tracker.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Detecnoma",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-detecnoma-poster.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-detecnoma-poster.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Dislu",
    anio: 2025,
    comision: "K5310",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-dislu-miercoles-5310-27-08-2025.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-dislu-miercoles-5310-27-08-2025.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Hip-Pal",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-hip-pal.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-hip-pal.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Literacy Manual",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-a3-literacy-manual.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-a3-literacy-manual.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "No te duermas",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-no-te-duermas.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-no-te-duermas.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "OnboardMe",
    anio: 2025,
    comision: "K5053",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-onbardme-k5053.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-onbardme-k5053.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "PriceFlow",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-priceflow-poster.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-priceflow-poster.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Realimentar",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-realimentar.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-realimentar.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Room Connector",
    anio: 2025,
    comision: "K5302",
    mini: "../assets/proyectos/mini/proyecto-final-2025-g5302-room-connector.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-g5302-room-connector.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "SIRCA",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-sirca.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-sirca.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "StockifAI",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-stockifai.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-stockifai.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Stratify",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-stratify-sin-profesores.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-stratify-sin-profesores.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "We move fashion",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-we-move-fashion.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-we-move-fashion.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Zonar",
    anio: 2025,
    comision: "",
    mini: "../assets/proyectos/mini/proyecto-final-2025-poster-zonar.webp",
    full: "../assets/proyectos/full/proyecto-final-2025-poster-zonar.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "AgroIA",
    anio: 2023,
    comision: "",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-agroia.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-agroia.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "AgroIA (v2)",
    anio: 2023,
    comision: "K5053",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-agroia-mod-1.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-agroia-mod-1.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "AgroÁgil",
    anio: 2023,
    comision: "",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-agroagil.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-agroagil.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "AInterview",
    anio: 2023,
    comision: "",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-ainterview.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-ainterview.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Autosavings",
    anio: 2023,
    comision: "",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-autosavings.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-autosavings.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "BeeSafe",
    anio: 2023,
    comision: "K5303",
    mini: "../assets/proyectos/mini/pf2023-jue5303-poster-beesafepng.webp",
    full: "../assets/proyectos/full/pf2023-jue5303-poster-beesafepng.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Labtrack",
    anio: 2023,
    comision: "",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-labtrack.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-labtrack.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "SmartEd",
    anio: 2023,
    comision: "",
    mini: "../assets/proyectos/mini/pf2023-jue5053-poster-smarted.webp",
    full: "../assets/proyectos/full/pf2023-jue5053-poster-smarted.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "BBOT",
    anio: 2022,
    comision: "",
    mini: "../assets/proyectos/mini/pf2022-jue5053-poster-bbot.webp",
    full: "../assets/proyectos/full/pf2022-jue5053-poster-bbot.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "BondiPago",
    anio: 2022,
    comision: "",
    mini: "../assets/proyectos/mini/pf2022-jue5053-poster-bondipago.webp",
    full: "../assets/proyectos/full/pf2022-jue5053-poster-bondipago.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "ForestOn",
    anio: 2022,
    comision: "",
    mini: "../assets/proyectos/mini/pf2022-jue5053-poster-foreston.webp",
    full: "../assets/proyectos/full/pf2022-jue5053-poster-foreston.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Luxury NFT",
    anio: 2022,
    comision: "",
    mini: "../assets/proyectos/mini/pf2022-jue5053-poster-luxury-nft.webp",
    full: "../assets/proyectos/full/pf2022-jue5053-poster-luxury-nft.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "TusInversiones",
    anio: 2022,
    comision: "",
    mini: "../assets/proyectos/mini/pf2022-jue5053-poster-tusinversiones.webp",
    full: "../assets/proyectos/full/pf2022-jue5053-poster-tusinversiones.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Reparture",
    anio: 2021,
    comision: "",
    mini: "../assets/proyectos/mini/pf2021-jue5054-poster-reparture.webp",
    full: "../assets/proyectos/full/pf2021-jue5054-poster-reparture.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Simulador",
    anio: 2021,
    comision: "K5054",
    mini: "../assets/proyectos/mini/pf2021-jue5054-poster-simulador.webp",
    full: "../assets/proyectos/full/pf2021-jue5054-poster-simulador.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Steve",
    anio: 2021,
    comision: "",
    mini: "../assets/proyectos/mini/pf2021-jue5404-poster-steve.webp",
    full: "../assets/proyectos/full/pf2021-jue5404-poster-steve.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "SérumAnalyzer",
    anio: 2021,
    comision: "K5054",
    mini: "../assets/proyectos/mini/pf2021-jue5054-poster-sermanalyzer.webp",
    full: "../assets/proyectos/full/pf2021-jue5054-poster-sermanalyzer.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Proyectate",
    anio: 2020,
    comision: "",
    mini: "../assets/proyectos/mini/pf2020-jue5052-poster-proyectate.webp",
    full: "../assets/proyectos/full/pf2020-jue5052-poster-proyectate.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "QueVino",
    anio: 2020,
    comision: "",
    mini: "../assets/proyectos/mini/pf2020-jue5052-poster-quevino.webp",
    full: "../assets/proyectos/full/pf2020-jue5052-poster-quevino.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Sekhmet",
    anio: 2020,
    comision: "",
    mini: "../assets/proyectos/mini/pf2020-jue5052-poster-sekhmet.webp",
    full: "../assets/proyectos/full/pf2020-jue5052-poster-sekhmet.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "HaliBot Univ",
    anio: 2016,
    comision: "",
    mini: "../assets/proyectos/mini/pf2016-vie-poster-hali-bot-univ.webp",
    full: "../assets/proyectos/full/pf2016-vie-poster-hali-bot-univ.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Boni-TA",
    anio: 2015,
    comision: "",
    mini: "../assets/proyectos/mini/pf2015-jue-poster-boni-ta.webp",
    full: "../assets/proyectos/full/pf2015-jue-poster-boni-ta.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Domofi",
    anio: 2015,
    comision: "",
    mini: "../assets/proyectos/mini/pf2015-jue-poster-domofi.webp",
    full: "../assets/proyectos/full/pf2015-jue-poster-domofi.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "GEESI",
    anio: 2015,
    comision: "",
    mini: "../assets/proyectos/mini/pf2015-juev-poster-geesi.webp",
    full: "../assets/proyectos/full/pf2015-juev-poster-geesi.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Prodigy",
    anio: 2015,
    comision: "",
    mini: "../assets/proyectos/mini/pf2015-jue-poster-prodigy.webp",
    full: "../assets/proyectos/full/pf2015-jue-poster-prodigy.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Tagzan",
    anio: 2012,
    comision: "",
    mini: "../assets/proyectos/mini/pf2012-vie-poster-tagzan.webp",
    full: "../assets/proyectos/full/pf2012-vie-poster-tagzan.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "Cartelería Digital",
    anio: 2010,
    comision: "",
    mini: "../assets/proyectos/mini/pf2010-vie-poster-carteleria-digital.webp",
    full: "../assets/proyectos/full/pf2010-vie-poster-carteleria-digital.webp",
    resumen: "",
    autores: "",
    autorizado: false
  },
  {
    titulo: "",
    anio: null,
    comision: "K5309",
    mini: "../assets/proyectos/mini/poster-5309-sin-profesores.webp",
    full: "../assets/proyectos/full/poster-5309-sin-profesores.webp",
    resumen: "",
    autores: "",
    autorizado: false,
    _pendiente: "FALTA: identificar el proyecto y el año"
  },
  {
    titulo: "AgroLink",
    anio: null,
    comision: "",
    mini: "../assets/proyectos/mini/poster-comercial-agrolink-integrantes.webp",
    full: "../assets/proyectos/full/poster-comercial-agrolink-integrantes.webp",
    resumen: "",
    autores: "",
    autorizado: false,
    _pendiente: "FALTA: confirmar el año de cursada"
  },
  {
    titulo: "SafePlace",
    anio: null,
    comision: "K5311",
    mini: "../assets/proyectos/mini/poster-safeplace-5311-miercoles-alumnos.webp",
    full: "../assets/proyectos/full/poster-safeplace-5311-miercoles-alumnos.webp",
    resumen: "",
    autores: "",
    autorizado: false,
    _pendiente: "FALTA: confirmar el año de cursada"
  }
]; 

/* Texto de arriba de la sección. Editable desde el modo edición. */
var INTRO = {
  titulo: "Lo que se construye para recibirse",
  texto: "Proyecto Final es la última materia de la carrera: un año entero desarrollando un sistema real, en equipo, " +
         "con un cliente y una fecha de entrega. Estos son los pósters con los que se presentaron. " +
         "Ninguno es un ejercicio de clase: todos resuelven un problema concreto de alguien.",
  _pendiente: "Elegir 6 u 8 pósters destacados para poner primero. Con 59 en la grilla el visitante no sabe por dónde empezar."
};
