/* ══════════════════════════════════════════════════════════════════
   editor.js — Modo edición colaborativo.

   PROBLEMA QUE RESUELVE
   El sitio corre desde el disco (file://), sin servidor y sin base de
   datos. No hay dónde guardar. Y como el proyecto se trabaja en Git,
   guardar en el navegador tampoco serviría: lo que se edite tiene que
   poder commitearse.

   CÓMO FUNCIONA
   1. Tocás "Editar" (o abrís la página con ?editar=1).
   2. Todos los textos se vuelven editables in situ. Los carruseles
      dejan agregar, borrar y reordenar fotos.
   3. Tocás "Descargar cambios": baja el archivo datos/<nombre>.js
      actualizado.
   4. Reemplazás el archivo en tu copia del repo y hacés commit.

   No pisa nada solo. Nada se guarda si no descargás.

   POR QUÉ NO localStorage: con protocolo file:// cada navegador se
   comporta distinto (Chrome lo trata como origen opaco) y además
   dejaría los cambios encerrados en una máquina, que es justo lo
   contrario de trabajar en equipo sobre un repo.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.EXPO;
  if (!E) { console.error("editor.js debe cargarse después de comun.js"); return; }

  var registro = [];      // [{archivo, cabecera, vars:{NOMBRE:valor}}]
  var activo = false;
  var sucio = false;

  /* ── Registro de archivos de datos ─────────────────────────────
     Cada módulo declara qué archivo edita y qué variables contiene. */
  function registrar(archivo, vars, cabecera) {
    registro.push({ archivo: archivo, vars: vars, cabecera: cabecera || "" });
  }

  /* ── Enlace campo ↔ dato ───────────────────────────────────────
     ruta: "PERFILES.2.nombre"  →  PERFILES[2].nombre
     Marca el elemento como editable y escribe de vuelta al soltar.  */
  function resolver(ruta) {
    var partes = ruta.split(".");
    var raiz = null;
    for (var i = 0; i < registro.length; i++) {
      if (partes[0] in registro[i].vars) { raiz = registro[i].vars[partes[0]]; break; }
    }
    if (raiz == null) return null;
    var obj = raiz, j;
    for (j = 1; j < partes.length - 1; j++) obj = obj[partes[j]];
    return { obj: obj, clave: partes[partes.length - 1] };
  }

  function ligar(elemento, ruta, opciones) {
    opciones = opciones || {};
    elemento.dataset.edit = ruta;
    if (opciones.multilinea) elemento.dataset.editMultilinea = "1";
    return elemento;
  }

  /* ── Activar / desactivar ──────────────────────────────────── */
  function pintarCampos(on) {
    E.qa("[data-edit]").forEach(function (n) {
      if (on) {
        n.setAttribute("contenteditable", "plaintext-only");
        n.classList.add("campo-editable");
        n.addEventListener("blur", alSalir);
        n.addEventListener("keydown", alTeclear);
      } else {
        n.removeAttribute("contenteditable");
        n.classList.remove("campo-editable");
        n.removeEventListener("blur", alSalir);
        n.removeEventListener("keydown", alTeclear);
      }
    });
  }

  function alTeclear(e) {
    /* Enter guarda y sale, salvo en campos de varias líneas. */
    if (e.key === "Enter" && !this.dataset.editMultilinea) { e.preventDefault(); this.blur(); }
    if (e.key === "Escape") { this.blur(); }
  }

  function alSalir() {
    var d = resolver(this.dataset.edit);
    if (!d) return;
    var nuevo = this.textContent.trim();
    if (d.obj[d.clave] !== nuevo) { d.obj[d.clave] = nuevo; marcarSucio(); }
  }

  function marcarSucio() {
    sucio = true;
    var b = document.getElementById("btn-descargar");
    if (b) { b.classList.add("hay-cambios"); b.textContent = "⬇ Descargar cambios"; }
  }

  /* ── Serializador ───────────────────────────────────────────────
     Genera un archivo .js válido a partir de los objetos en memoria.
     ⚠ Los comentarios largos del archivo original NO se conservan:
     la explicación de cada archivo vive en datos/LEEME-datos.md.     */
  function volcar(v, sangria) {
    var s = sangria || "";
    var s2 = s + "  ";
    if (v === null) return "null";
    if (typeof v === "string") return JSON.stringify(v);
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    if (Array.isArray(v)) {
      if (!v.length) return "[]";
      var simple = v.every(function (x) { return typeof x !== "object" || x === null; });
      if (simple) return "[" + v.map(function (x) { return volcar(x); }).join(", ") + "]";
      return "[\n" + v.map(function (x) { return s2 + volcar(x, s2); }).join(",\n") + "\n" + s + "]";
    }
    var claves = Object.keys(v);
    if (!claves.length) return "{}";
    return "{\n" + claves.map(function (k) {
      return s2 + (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ": " + volcar(v[k], s2);
    }).join(",\n") + "\n" + s + "}";
  }

  function generar(entrada) {
    var hoy = new Date().toISOString().slice(0, 10);
    var txt = "/* " + entrada.archivo + "\n" +
      "   " + (entrada.cabecera || "Contenido de la sección.") + "\n" +
      "   Exportado desde el modo edición del sitio · " + hoy + "\n" +
      "   Documentación de los campos: datos/LEEME-datos.md */\n\n";
    Object.keys(entrada.vars).forEach(function (n) {
      txt += "var " + n + " = " + volcar(entrada.vars[n]) + ";\n\n";
    });
    return txt;
  }

  function descargar() {
    if (!registro.length) { alert("Esta página no tiene archivo de datos registrado."); return; }
    registro.forEach(function (entrada) {
      var blob = new Blob([generar(entrada)], { type: "text/javascript;charset=utf-8" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = entrada.archivo.split("/").pop();
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    sucio = false;
    var b = document.getElementById("btn-descargar");
    if (b) { b.classList.remove("hay-cambios"); b.textContent = "⬇ Descargar cambios"; }
  }

  /* ── Barra de edición ──────────────────────────────────────── */
  function barra() {
    var b = E.el("div", "barra-edicion");
    b.id = "barra-edicion";
    b.innerHTML =
      '<span class="be-titulo">Modo edición</span>' +
      '<span class="be-nota">Tocá cualquier texto para cambiarlo. Los cambios se bajan como archivo para commitear.</span>';
    var bajar = E.el("button", "be-boton", "⬇ Descargar cambios");
    bajar.id = "btn-descargar"; bajar.onclick = descargar;
    var salir = E.el("button", "be-boton fantasma", "Salir");
    salir.onclick = function () {
      if (sucio && !confirm("Hay cambios sin descargar. Se pierden. ¿Salir igual?")) return;
      alternar(false);
    };
    b.appendChild(bajar); b.appendChild(salir);
    document.body.appendChild(b);
  }

  function alternar(on) {
    activo = on;
    document.body.classList.toggle("editando", on);
    pintarCampos(on);
    var b = document.getElementById("barra-edicion");
    if (on && !b) barra();
    if (!on && b) b.remove();
    E.qa(".solo-edicion").forEach(function (n) { n.hidden = !on; });
    var t = document.getElementById("btn-editar");
    if (t) t.textContent = on ? "Cerrar edición" : "✎ Editar";
  }

  /* ── Botón en la cabecera ──────────────────────────────────── */
  function montar() {
    /* Interruptor general — ver js/config.js */
    if (typeof EDICION_HABILITADA !== "undefined" && EDICION_HABILITADA === false) return;
    var m = E.q(".marca");
    if (!m) return;
    var t = E.el("button", "marca-volver", "✎ Editar");
    t.id = "btn-editar";
    t.style.marginLeft = "10px";
    t.onclick = function () {
      if (!activo && typeof EDICION_CLAVE !== "undefined" && EDICION_CLAVE) {
        if (prompt("Clave de edición:") !== EDICION_CLAVE) return;
      }
      alternar(!activo);
    };
    m.appendChild(t);
    if (/[?&]editar=1/.test(location.search)) alternar(true);
  }

  /* ── Importador de imágenes ─────────────────────────────────────
     No hay servidor: el navegador no puede escribir en assets/.
     Entonces hacemos el camino inverso — el navegador te DEVUELVE el
     archivo ya renombrado, vos lo soltás en la carpeta, y el dato
     queda apuntando a la ruta correcta.

     Dos modos:
     · "archivo"  (recomendado) → descarga la imagen renombrada y deja
                                  la ruta en el dato. El .js queda liviano
                                  y el repo, ordenado.
     · "incrustar"              → guarda la imagen dentro del .js como
                                  base64. No hay que mover nada, pero el
                                  archivo de datos crece ~1,33× el peso de
                                  la foto y ensucia los diff de Git.
     ══════════════════════════════════════════════════════════════ */
  function slug(nombre) {
    return nombre.replace(/\.[^.]+$/, "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "foto";
  }

  function importarImagenes(archivos, carpeta, modo, alListo) {
    var restantes = archivos.length, resultados = [];
    Array.prototype.forEach.call(archivos, function (f) {
      if (!/^image\//.test(f.type)) {
        alert('"' + f.name + '" no es una imagen. Se admiten JPG, PNG, WEBP y GIF.');
        if (--restantes === 0) alListo(resultados);
        return;
      }
      var ext = (f.name.match(/\.[^.]+$/) || [".jpg"])[0].toLowerCase();
      var nombre = slug(f.name) + ext;
      var lector = new FileReader();
      lector.onload = function () {
        if (modo === "incrustar") {
          resultados.push({ img: lector.result, titulo: "", pie: "", _incrustada: true });
        } else {
          /* Devolver el archivo renombrado para que lo copie a la carpeta. */
          var a = document.createElement("a");
          a.href = lector.result; a.download = nombre;
          document.body.appendChild(a); a.click(); a.remove();
          resultados.push({ img: "../assets/fotos/" + carpeta + "/" + nombre, titulo: "", pie: "" });
        }
        if (--restantes === 0) alListo(resultados);
      };
      lector.onerror = function () {
        alert("No se pudo leer " + f.name);
        if (--restantes === 0) alListo(resultados);
      };
      lector.readAsDataURL(f);
    });
  }

  /* ── Carruseles editables ───────────────────────────────────────
     Reemplaza la lista de fotos por una grilla con controles.       */
  function carruselEditable(contenedor, lista, ruta, dibujar, carpeta) {
    carpeta = carpeta || "congresos";

    function redibujar() {
      contenedor.innerHTML = "";
      dibujar(contenedor, lista);
      if (!activo) return;

      var panel = E.el("div", "panel-fotos solo-edicion");
      var cab = E.el("div", "panel-cab");
      cab.innerHTML = "<strong>" + lista.length + " foto" + (lista.length === 1 ? "" : "s") +
        "</strong><span>Carpeta destino: <code>assets/fotos/" + E.esc(carpeta) + "/</code></span>";
      panel.appendChild(cab);

      lista.forEach(function (item, i) {
        var f = E.el("div", "fila-foto");
        var im = E.el("img");
        im.src = item.img; im.alt = "";
        im.onerror = function () { im.classList.add("rota"); im.title = "No se encuentra el archivo"; };
        f.appendChild(im);

        var campos = E.el("div", "campos");
        [["img", item.img, "ruta del archivo"],
         ["titulo", item.titulo || "", "título"],
         ["pie", item.pie || "", "epígrafe"]].forEach(function (c) {
          var inp = document.createElement("input");
          inp.value = c[1]; inp.placeholder = c[2]; inp.dataset.c = c[0];
          if (c[0] === "img" && item._incrustada) {
            inp.value = "(imagen incrustada · " + Math.round(item.img.length / 1365) + " KB)";
            inp.disabled = true;
          }
          inp.oninput = function () {
            item[inp.dataset.c] = inp.value;
            if (inp.dataset.c === "img") { im.src = inp.value; im.classList.remove("rota"); }
            marcarSucio();
          };
          campos.appendChild(inp);
        });
        f.appendChild(campos);

        var mandos = E.el("div", "mandos-foto");
        [["↑", "Subir", function () { if (i > 0) { lista.splice(i - 1, 0, lista.splice(i, 1)[0]); marcarSucio(); redibujar(); } }],
         ["↓", "Bajar", function () { if (i < lista.length - 1) { lista.splice(i + 1, 0, lista.splice(i, 1)[0]); marcarSucio(); redibujar(); } }],
         ["✕", "Eliminar", function () {
            if (confirm('¿Eliminar "' + (item.titulo || item.img.slice(0, 40)) + '" del carrusel?\n\nEsto la saca del sitio. El archivo en assets/ no se borra.')) {
              lista.splice(i, 1); marcarSucio(); redibujar();
            } }]
        ].forEach(function (par) {
          var b = E.el("button", null, par[0]);
          b.title = par[1]; b.setAttribute("aria-label", par[1]);
          b.onclick = par[2];
          mandos.appendChild(b);
        });
        f.appendChild(mandos);
        panel.appendChild(f);
      });

      /* Pie del panel: importar y agregar */
      var pie = E.el("div", "panel-pie");

      var inputArch = document.createElement("input");
      inputArch.type = "file"; inputArch.accept = "image/*"; inputArch.multiple = true;
      inputArch.style.display = "none";

      var modo = document.createElement("select");
      modo.innerHTML = '<option value="archivo">Guardar como archivo (recomendado)</option>' +
                       '<option value="incrustar">Incrustar en el .js (base64)</option>';
      modo.title = "Cómo se guarda la imagen importada";

      var subir = E.el("button", "be-boton", "⬆ Importar fotos de mi computadora");
      subir.onclick = function () { inputArch.click(); };

      inputArch.onchange = function () {
        if (!inputArch.files.length) return;
        importarImagenes(inputArch.files, carpeta, modo.value, function (nuevas) {
          nuevas.forEach(function (n) { lista.push(n); });
          marcarSucio();
          redibujar();
          if (modo.value === "archivo" && nuevas.length) {
            alert("Se descargaron " + nuevas.length + " archivo(s) renombrado(s).\n\n" +
                  "Copialos a: assets/fotos/" + carpeta + "/\n\n" +
                  "Hasta que los copies, la miniatura va a aparecer con borde rojo.");
          }
        });
        inputArch.value = "";
      };

      var manual = E.el("button", "be-boton fantasma", "+ Agregar por ruta");
      manual.onclick = function () {
        lista.push({ img: "../assets/fotos/" + carpeta + "/", titulo: "", pie: "" });
        marcarSucio(); redibujar();
      };

      pie.appendChild(subir);
      pie.appendChild(modo);
      pie.appendChild(manual);
      pie.appendChild(inputArch);
      panel.appendChild(pie);

      contenedor.appendChild(panel);
    }

    contenedor._redibujar = redibujar;
    redibujar();
    return redibujar;
  }

  E.editor = {
    registrar: registrar, ligar: ligar, alternar: alternar,
    carruselEditable: carruselEditable, marcarSucio: marcarSucio,
    activo: function () { return activo; }
  };
  E.ligar = ligar;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
