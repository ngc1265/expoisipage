# Cómo trabajar en equipo sobre este repo

## Poner el proyecto en GitHub

No hace falta nada especial: es HTML, CSS, JS y fotos. **No hay build, no hay
dependencias, no hay `npm install`.**

```bash
cd expo
git init
git add .
git commit -m "Sitio del stand de Sistemas - Expo UTN 2026"
git branch -M main
git remote add origin git@github.com:USUARIO/REPO.git
git push -u origin main
```

Y para trabajarlo desde otra máquina:

```bash
git clone git@github.com:USUARIO/REPO.git
```

Después se abre `index.html` con doble clic. **Funciona directo desde el clon**,
sin servidor. Eso es exactamente lo que va a pasar el 16/09.

## Lo único que conviene saber

**Peso.** Las fotos son lo pesado del repo. Ahora son unos 5 MB, sin problema.
Git empieza a molestar arriba de ~1 GB, así que hay margen de sobra. **No hace
falta Git LFS.** Si alguna vez pasa a ser un problema, la solución es bajar la
resolución de las fotos, no cambiar de herramienta.

**Conflictos.** El riesgo real es que dos personas editen el mismo
`datos/*.js` al mismo tiempo: Git no sabe fusionar eso y hay que resolverlo a
mano. Se evita repartiendo por sección:

| Persona | Archivos |
|---|---|
| A | `datos/plan-estudios.js`, `datos/materias.js` |
| B | `datos/investigacion.js`, `datos/vida.js` |
| C | `datos/salida-laboral.js`, `datos/incumbencias.js` |

Si igual se pisan, la salida más rápida es que una de las dos personas vuelva a
aplicar sus cambios en modo edición sobre la versión del otro, y exporte de nuevo.

**No commitees imágenes incrustadas en base64** salvo que sea imprescindible.
El modo edición lo permite (opción "Incrustar en el .js"), pero cada foto suma
~1,33× su peso al archivo de datos y ensucia los diff. Usá siempre
"Guardar como archivo".

## El ciclo de trabajo

1. `git pull`
2. Abrís la sección, tocás **✎ Editar**, cargás contenido
3. **⬇ Descargar cambios** → baja el `datos/*.js`
4. Reemplazás el archivo en tu copia del repo
5. Si importaste fotos, moverlas también a `assets/fotos/<carpeta>/`
6. `git add . && git commit -m "..." && git push`

## Antes de commitear

```bash
# Verificar que ningún archivo de datos quedó roto
for f in datos/*.js js/*.js; do node --check "$f" || echo "ROTO: $f"; done
```

Si no tenés Node a mano, abrí la página y mirá la consola del navegador (F12).
Un archivo de datos con un error de sintaxis deja la sección en blanco.

## ¿GitHub Pages?

Ver **`PUBLICAR.md`**. Resumen de una línea: **un sitio de Pages es público
aunque el repo sea privado**, así que leé ese archivo antes de activarlo.
