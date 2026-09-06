/* ══════════════════════════════════════════════════════════════════
   comun.js — utilidades compartidas por todos los módulos.

   IMPORTANTE: script clásico, sin import/export. Los módulos ES
   (type="module") NO funcionan con protocolo file://, y el sitio se
   abre con doble clic. Todo lo público cuelga de window.EXPO.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var EXPO = {};

  /* ── Helpers de DOM ─────────────────────────────────────────── */
  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  }
  function q(sel, raiz) { return (raiz || document).querySelector(sel); }
  function qa(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  /* Escapa texto que viene de los archivos de /datos/ antes de
     inyectarlo como HTML. Los datos los carga gente a mano: mejor
     que un ampersand suelto no rompa la página. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ── Carrusel ───────────────────────────────────────────────────
     Uso:  EXPO.carrusel(contenedor, [{img, titulo, pie, alt}])
     El contenedor recibe la pista + los botones de avance.
     Los botones son grandes a propósito (tracking de manos).      */
  function carrusel(contenedor, items, opciones) {
    opciones = opciones || {};
    if (!contenedor) return;
    contenedor.classList.add("carrusel");
    contenedor.innerHTML = "";

    var pista = el("div", "carrusel-pista");
    items.forEach(function (it) {
      var card = el("figure", "carrusel-item");
      if (it.img) {
        var im = el("img");
        im.src = it.img;
        im.alt = it.alt || it.titulo || "";
        im.loading = "lazy";
        /* Si falta la foto, la tarjeta no se rompe: queda el pie. */
        im.onerror = function () {
          im.remove();
          var ph = el("div", "carrusel-pie");
          var av = pendiente("Falta la imagen", it.img);
          ph.appendChild(av);
          card.prepend(ph);
        };
        card.appendChild(im);
      }
      var pie = el("figcaption", "carrusel-pie");
      if (it.titulo) pie.appendChild(el("h3", null, it.titulo));
      if (it.pie) pie.appendChild(el("p", null, it.pie));
      card.appendChild(pie);
      pista.appendChild(card);
    });
    contenedor.appendChild(pista);

    if (opciones.mandos !== false) {
      var mandos = el("div", "carrusel-mandos");
      var izq = el("button", null, "‹"); izq.setAttribute("aria-label", "Anterior");
      var der = el("button", null, "›"); der.setAttribute("aria-label", "Siguiente");
      var paso = function () { return pista.clientWidth * 0.8; };
      izq.onclick = function () { pista.scrollBy({ left: -paso(), behavior: "smooth" }); };
      der.onclick = function () { pista.scrollBy({ left: paso(), behavior: "smooth" }); };
      mandos.appendChild(izq); mandos.appendChild(der);
      contenedor.appendChild(mandos);
    }
  }

  /* ── QR ─────────────────────────────────────────────────────────
     Los SVG están pregenerados en /assets/qr/. No se puede usar
     fetch() con file://, así que se insertan con <object>, que sí
     carga archivos locales. Si falta, se muestra la URL en texto.  */
  function qr(archivo, urlVisible) {
    var caja = el("div", "qr");
    var obj = document.createElement("object");
    obj.type = "image/svg+xml";
    obj.data = "../assets/qr/" + archivo + ".svg";
    obj.setAttribute("aria-label", "Código QR hacia " + (urlVisible || archivo));
    caja.appendChild(obj);
    return caja;
  }

  /* ── Bloque QR + texto ──────────────────────────────────────── */
  function filaQr(archivo, url, leyenda) {
    var fila = el("div", "qr-fila");
    fila.appendChild(qr(archivo, url));
    var txt = el("div");
    txt.appendChild(el("p", "nota", leyenda || "Escaneá con el celular para abrir el sitio oficial."));
    var a = el("a", "nota", url);
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    a.style.wordBreak = "break-all";
    txt.appendChild(a);
    fila.appendChild(txt);
    return fila;
  }

  /* ── Aviso de dato faltante ─────────────────────────────────────
     REGLA: el visitante NO ve los huecos. Los avisos amarillos llevan
     la clase .solo-edicion y arrancan ocultos; editor.js los prende
     al entrar en modo edición y los apaga al salir.
     Para verlos siempre (repartir tareas en el equipo sin la clave),
     poné MOSTRAR_PENDIENTES_EN_VISTA = true en js/config.js.        */
  function verPendientes() {
    if (typeof MOSTRAR_PENDIENTES_EN_VISTA !== "undefined" && MOSTRAR_PENDIENTES_EN_VISTA === true) {
      /* La clase la lee el CSS: es lo que decide de verdad si se ven.
         El atributo hidden queda como refuerzo, no como único control. */
      document.body.classList.add("mostrar-pendientes");
      return true;
    }
    return document.body.classList.contains("editando");
  }

  function pendiente(titulo, detalle) {
    var d = el("div", "pendiente solo-edicion");
    d.innerHTML = "<strong>" + esc(titulo) + "</strong>" + esc(detalle || "");
    d.hidden = !verPendientes();
    return d;
  }

  /* ── Encabezado y pie comunes ───────────────────────────────────
     Se inyectan por JS para no repetir markup en cada módulo:
     cambiás acá y cambia en los nueve HTML.                        */
  function cabecera(titulo, volverA) {
    var m = el("header", "marca");
    m.innerHTML =
      '<div class="marca-logo">UTN<span>.BA</span></div>' +
      '<div class="marca-sub">Universidad Tecnológica Nacional<br>Facultad Regional Buenos Aires</div>';
    var v = el("a", "marca-volver", "← Volver al inicio");
    v.href = volverA || "../index.html";
    m.appendChild(v);
    document.body.prepend(m);
    if (titulo) document.title = titulo + " · Expo UTN 2026";
  }

  function pie(texto) {
    var f = el("footer", "pie");
    var w = el("div", "envoltorio");
    w.innerHTML = '<p>Expo UTN 2026 · Stand de Ingeniería en Sistemas de Información · ' +
      'Miércoles 16 de septiembre de 2026 · Campus UTN.BA</p>' +
      (texto ? '<p class="nota" style="color:#8B929C;margin-top:8px">' + esc(texto) + "</p>" : "");
    f.appendChild(w);
    document.body.appendChild(f);
  }

  /* ── Integración con el tracking de manos ───────────────────────
     El módulo de tracking vive en el documento y no lo escribimos
     acá. Contrato mínimo que este sitio respeta:

       · Todo lo accionable lleva la clase .accionable y es un
         <button>, <a> o [tabindex="0"] real.
       · El área mínima de cada objetivo es 88px (variable --hit).
       · Mientras el cursor está encima, agregale la clase .apuntado.
       · Para el dwell (mantener para seleccionar) podés usar
         EXPO.dwell(elemento, ms, alCompletar): dibuja la barra de
         progreso y dispara un click real al terminar.

     Si el tracking termina siendo otra cosa, lo único que hay que
     tocar es esta función.                                         */
  function dwell(elemento, ms, alCompletar) {
    var barra = q(".progreso-dwell", elemento);
    if (!barra) {
      barra = el("div", "progreso-dwell");
      if (getComputedStyle(elemento).position === "static") elemento.style.position = "relative";
      elemento.appendChild(barra);
    }
    var t0 = performance.now();
    var id = requestAnimationFrame(function paso(t) {
      var p = Math.min(1, (t - t0) / ms);
      barra.style.width = (p * 100) + "%";
      if (p < 1) { id = requestAnimationFrame(paso); }
      else { barra.style.width = "0"; (alCompletar || function () { elemento.click(); })(); }
    });
    return function cancelar() { cancelAnimationFrame(id); barra.style.width = "0"; };
  }

  EXPO.el = el; EXPO.q = q; EXPO.qa = qa; EXPO.esc = esc;
  EXPO.carrusel = carrusel; EXPO.qr = qr; EXPO.filaQr = filaQr;
  EXPO.pendiente = pendiente; EXPO.verPendientes = verPendientes;
  EXPO.cabecera = cabecera; EXPO.pie = pie;
  EXPO.dwell = dwell;
  window.EXPO = EXPO;
})();
