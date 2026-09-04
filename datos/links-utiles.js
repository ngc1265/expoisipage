/* ══════════════════════════════════════════════════════════════════
   datos/links-utiles.js — sección "Links útiles"

   Cada bloque: titulo, texto, items[] (texto suelto), url + qr.
   El campo `qr` es el nombre del SVG en assets/qr/ SIN la extensión.
   Para generar uno nuevo, ver LEEME.md.
   ══════════════════════════════════════════════════════════════════ */

var BLOQUES = [
  {
    titulo: "Todo el stand en tu celular",
    texto: "Los enlaces del stand, agrupados en una sola página. Escaneá y te los llevás.",
    url: "https://expocarrerassistemas.taplink.site/",
    qr: "taplink-expo",
    leyenda: "Página de enlaces del stand de Sistemas."
  },
  {
    titulo: "Cómo ingresar a la UTN.BA",
    texto: "Requisitos, inscripción y el Seminario de Ingreso. Es el punto de partida para cualquiera que quiera empezar la carrera.",
    url: "https://frba.utn.edu.ar/ingreso/ingresa/",
    qr: "frba-ingreso",
    leyenda: "Ingreso a la Facultad Regional Buenos Aires.",
    items: [
      "Ahí está el calendario de inscripción vigente.",
      "El Seminario Universitario de Ingreso es la puerta de entrada a todas las carreras de grado."
    ]
  },
  {
    titulo: "Aulas virtuales",
    texto: "El campus donde cursás: material de cada materia, entregas, foros y avisos de las cátedras.",
    url: "https://aulasvirtuales.frba.utn.edu.ar/",
    qr: "frba-aulas-virtuales",
    leyenda: "Campus virtual de UTN.BA (requiere usuario de la Facultad)."
  },
  {
    titulo: "Este sitio",
    texto: "Podés volver a recorrer todo lo del stand desde tu casa, con calma.",
    url: "https://expoisi.com.ar/",
    qr: "expoisi-sitio",
    leyenda: "El sitio del stand, online.",
    _pendiente: "Confirmar que el dominio expoisi.com.ar ya resuelve antes del 16/09. Si no llegó a propagar, sacar este bloque o cambiar la URL por la de *.web.app."
  }
];
