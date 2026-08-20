# Stand de Ingeniería en Sistemas · Expo UTN 2026

Sitio del stand. Corre **sin internet y sin servidor**: se abre haciendo doble clic en `index.html`.

---

## Reglas del proyecto (no negociables)

1. **Cero recursos externos.** Nada de Google Fonts, nada de CDN, nada de `fetch()`.
   Si algo necesita descargarse, el 16/09 no se ve.
2. **Solo fuentes de sistema.** Si querés una tipografía propia, va como archivo local
   en `/assets/fuentes/` y se declara con `@font-face` en `css/base.css`.
3. **Sin módulos ES.** `<script type="module">` no funciona con protocolo `file://`.
   Todos los scripts son clásicos y lo público cuelga de `window.EXPO`.
4. **Sin `localStorage`.** Con `file://` se comporta de forma impredecible entre navegadores.

---

## Cómo se carga contenido

**Nunca se edita un HTML para cargar contenido.** Todo el texto está en `/datos/`.

| Sección | Archivo a editar |
|---|---|
| Plan de estudios, tutorías, apoyo, laboratorios | `datos/plan-estudios.js` |
| Materias: docentes, fotos, proyectos | `datos/materias.js` |
| Salida laboral: perfiles y empresas | `datos/salida-laboral.js` |
| Investigación: congresos, paper, graduados | `datos/investigacion.js` |
| Vida y testimonios | `datos/vida.js` |
| Incumbencias / Proyectos / Electivas / Links | `datos/<seccion>.js` |

Se abren con cualquier editor de texto. Son listas de objetos JavaScript: respetá las comas
y las comillas y listo.

El campo `_pendiente` hace que aparezca un recuadro amarillo en la página avisando qué falta.
**Cuando cargues el dato real, borrá esa línea.**

---

## Estructura

```
index.html              andamio de navegación (reemplazable por la landing real)
css/base.css            identidad visual compartida
js/comun.js             carrusel, QR, cabecera, pie, hook de tracking
datos/*.js              TODO el contenido editable
secciones/*.html        un módulo por sección — se editan de a uno
assets/fotos/           imágenes
assets/qr/              códigos QR pregenerados en SVG
assets/docs/            PDFs (falta copiar el paper del CoNaIISI 2017)
```

Cambiar un módulo no toca ningún otro archivo. El `index.html` solo enlaza.

---

## Generar un QR nuevo

Los QR son SVG pregenerados porque no se puede usar una librería online. Para agregar uno:

```bash
pip install qrcode
python3 - <<'PY'
import qrcode.image.svg, qrcode
q = qrcode.QRCode(box_size=10, border=2)
q.add_data("https://LA-URL-QUE-QUIERAS")
q.make(fit=True)
img = q.make_image(image_factory=qrcode.image.svg.SvgPathImage)
open("assets/qr/NOMBRE.svg","wb").write(img.to_string())
PY
```

Después referencialo desde el archivo de datos con `qr: "NOMBRE"` (sin `.svg`).

---

## Modo edición

Botón **✎ Editar** arriba a la derecha (o `?editar=1` en la URL).

- Todo el texto queda editable in situ.
- Los carruseles tienen panel para **importar fotos desde tu computadora**,
  agregar por ruta, reordenar y eliminar.
- **⬇ Descargar cambios** baja el `datos/*.js` actualizado para commitear.
- Nada se guarda solo. Si cerrás sin descargar, se pierde.

**Para apagarlo el día de la Expo:** en `js/config.js`,
`var EDICION_HABILITADA = false;`. Una línea, un archivo.

Detalle completo en `datos/LEEME-datos.md` y `CONTRIBUIR.md`.

---

## Integración con el tracking de manos

El sitio no incluye el tracking: lo aporta la landing. El contrato es:

- Todo lo accionable lleva la clase `.accionable` y es `<button>`, `<a>` o `[tabindex="0"]` real.
- El objetivo mínimo de selección es **88 px** (variable CSS `--hit`).
- Mientras el cursor apunta un elemento, agregale la clase `.apuntado`.
- Para el dwell hay `EXPO.dwell(elemento, ms, alCompletar)`: dibuja la barra de progreso
  y dispara un click real al terminar.

Si el tracking resulta ser otra cosa, lo único que hay que reescribir es esa función
en `js/comun.js`.

**Importante:** los módulos son páginas completas, no iframes. Es a propósito: un cursor
dibujado en un documento padre no dispara eventos dentro de un iframe, así que embeber
las secciones habría roto la interacción del stand.

---

## Antes del 16/09 — checklist

- [ ] Verificar las correlativas contra el plan oficial (ver `DISCREPANCIAS` en `datos/plan-estudios.js`)
- [ ] Pedir autorización por escrito para cada foto con personas identificables
- [ ] Pedir autorización a cada autor de publicación de LinkedIn
- [ ] Cargar equipo docente de las materias
- [ ] Confirmar áreas y contacto del equipo interdisciplinario con Secretaría Académica
- [ ] Conseguir el listado de convenios internacionales
- [ ] Copiar el PDF del paper a `assets/docs/`
- [ ] Sacar fotos de los laboratorios (Campus y Medrano)
- [ ] Probar TODO en la computadora del evento, con el cable de red desenchufado
- [ ] **Poner `EDICION_HABILITADA = false` en `js/config.js`**
