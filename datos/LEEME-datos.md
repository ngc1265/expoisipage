# Cómo cargar contenido

Todo el texto del sitio vive en esta carpeta. **Nunca hay que editar un HTML para cargar contenido.**

Hay dos formas de trabajar. Las dos terminan en un commit.

---

## Forma A — modo edición en el navegador (recomendada)

1. Abrí cualquier sección y tocá **✎ Editar** arriba a la derecha
   (o agregale `?editar=1` a la URL).
2. Los textos quedan con borde punteado azul. Tocá y escribí.
   `Enter` guarda, `Escape` cancela.
3. En los carruseles aparece un panel para agregar, borrar, reordenar
   fotos y editar rutas y epígrafes.
4. Tocá **⬇ Descargar cambios**. Baja el archivo `.js` actualizado.
5. Reemplazá el archivo en tu copia del repo y hacé commit.

Nada se guarda solo. Si cerrás sin descargar, se pierde.

**Limitación conocida:** el archivo exportado no conserva los comentarios
largos del original. Por eso la documentación de los campos está acá y no
adentro de cada `.js`.

## Forma B — editar el archivo a mano

Abrilos con cualquier editor de texto. Son listas de objetos JavaScript.
Respetá comas y comillas. Antes de commitear, verificá que no rompiste
la sintaxis: `node --check datos/archivo.js`.

---

## Convenciones comunes

| Campo | Qué hace |
|---|---|
| `_pendiente` | Dibuja un recuadro amarillo en la página avisando qué falta. **Borralo cuando cargues el dato real.** |
| `qr` | Nombre del archivo en `/assets/qr/` **sin** la extensión `.svg`. |
| `url` | La URL a la que apunta ese QR. Van siempre juntos. |
| `autorizado` | Solo en fotos de personas. En `false` la foto no se publica. |
| `img` | Ruta relativa desde `/secciones/`, o sea empieza con `../assets/`. |

---

## Archivo por archivo

### `plan-estudios.js`
- `MATERIAS` — las 36 del plan K23. `c` = correlativas cursadas, `a` = aprobadas,
  `tr: 1` = integradora, `d` = descripción para ingresantes (editable).
  **No cambies `id` ni `lv`**: el mapa de correlativas los usa.
- `DISCREPANCIAS` — diferencias detectadas entre los dos roadmaps de origen.
  Vaciá la lista cuando estén verificadas contra el plan oficial.
- `ELECTIVAS`, `TUTORIAS`, `APOYO`, `LABORATORIOS`.

### `materias.js`
- `DETALLE_MATERIAS` — indexado por número de materia. Se agrega
  `docentes[]`, `fotos[]`, `proyectos[]` y `programa` (URL del PDF oficial).

### `salida-laboral.js`
- `NIVELES_DEV` — junior / semi senior / senior.
- `PERFILES` — los diez perfiles. `materias` son números del plan;
  el sitio resuelve el nombre solo.
- **Regla fija: se nombran empresas en texto, nunca con logo ni isotipo.**
  La universidad es pública y no corresponde dar señal de auspicio.

### `investigacion.js`
- `CONGRESOS`, `PONENCIAS`, `PUBLICACION`, `ACTAS`, `GRADUADOS`,
  `COOPERACION`, `FOTOS_CONGRESOS`.

### `vida.js`
- `TESTIMONIOS` — publicaciones de LinkedIn. El `urn` sale de la URL del
  post: `activity-123…` → `urn:li:activity:123…`. El embed necesita
  internet; sin conexión se muestra el `respaldo` y el QR.
- `GRADUACIONES`, `ESPACIOS`.

### `incumbencias.js`, `proyectos.js`, `electivas.js`, `links-utiles.js`
Usan la lista genérica `BLOQUES`: `{ titulo, texto, items[], url, qr, _pendiente }`.

---

## Agregar una foto nueva

1. Copiá el archivo a la subcarpeta que corresponda de `/assets/fotos/`.
2. En modo edición, **+ Agregar foto** y escribí la ruta.
   Si la miniatura queda con borde rojo, la ruta está mal.
3. Descargá y commiteá.

## Agregar un QR nuevo

Ver `LEEME.md` en la raíz.

---

## Importar fotos desde tu computadora

En modo edición, en el panel de cualquier carrusel: **⬆ Importar fotos**.

Hay dos modos en el desplegable de al lado:

**Guardar como archivo (recomendado).** El navegador te devuelve la imagen
descargada y ya renombrada (`Mi Foto 3.JPG` → `mi-foto-3.jpg`), y deja la ruta
cargada en el dato. Vos la copiás a la carpeta que te indica el panel. Hasta que
la copies, la miniatura aparece con borde rojo — es normal.

**Incrustar en el .js (base64).** La imagen queda guardada adentro del archivo de
datos. No hay que mover nada, pero el `.js` crece más o menos 1,33 veces el peso
de la foto y los diff de Git se vuelven ilegibles. Usalo solo para una prueba
rápida.

> **Por qué no se guarda sola:** el sitio corre con protocolo `file://`. El
> navegador no tiene permiso para escribir en el disco — es una restricción de
> seguridad, no algo que se pueda esquivar. La única forma de que un navegador
> guarde un archivo es descargándolo.

## Eliminar una foto

El botón **✕** de cada fila. Saca la foto del carrusel; **el archivo en
`assets/fotos/` no se borra**. Si querés eliminarlo de verdad, borralo a mano y
commiteá.
