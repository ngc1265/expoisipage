# Publicar en GitHub Pages

## Leé esto antes de tocar nada

**Un sitio de Pages es público aunque el repositorio sea privado.** Son dos
configuraciones distintas. Poder construir desde un repo privado no vuelve
privado al sitio.

Si pusiste el repo en privado para que nadie entre sin autorización, publicar en
Pages anula esa decisión: cualquiera con la URL ve el sitio, y puede descargar
todo el HTML, el JS y las fotos.

Sitio privado de verdad en Pages existe, pero **solo con GitHub Enterprise
Cloud** (Settings → Pages → Visibility → Private). No alcanza con Pro ni Team.

### Qué necesitás según tu plan

| Tu plan | ¿Pages desde repo privado? | ¿El sitio queda privado? |
|---|---|---|
| Free (personal) | No | — |
| Pro (personal) | Sí | **No, el sitio es público** |
| Team (organización) | Sí | **No, el sitio es público** |
| Enterprise Cloud | Sí | Sí, con Pages access control |

Si estás en Free y el repo es privado, Pages directamente no se activa. Las
opciones son: pasar a Pro, o hacer público el repo.

---

## Decidí primero para qué querés Pages

**Si es para que el equipo revise el avance** → Pages sirve, con las salvaguardas
que ya están armadas (ver abajo). Es una URL fea que nadie va a encontrar por
casualidad. No es secreta, pero no está indexada si sumás un `robots.txt`.

**Si es para el stand el 16/09** → no la necesitás. El sitio corre local, esa es
toda la premisa del proyecto. Pages no aporta nada ahí.

**Si es porque necesitás control de acceso real** → Pages no es la herramienta.
Cloudflare Pages y Netlify tienen protección por contraseña en planes bajos, y
son igual de simples para un sitio estático.

> Poner una contraseña en JavaScript del lado del cliente **no protege nada**:
> está a la vista en el código fuente, y los archivos se descargan igual.

---

## Cómo activarlo

1. En GitHub: **Settings → Pages**
2. En **Source**, elegí **GitHub Actions** (no "Deploy from a branch")
3. Hacé push a `main`

El workflow `.github/workflows/publicar.yml` corre solo. Queda en
`https://USUARIO.github.io/REPO/`

Si preferís sin workflow: **Source → Deploy from a branch → main → / (root)**.
Funciona, pero perdés las dos salvaguardas de acá abajo.

---

## Qué hace el workflow por vos

**Verifica la sintaxis** de todos los `datos/*.js` y `js/*.js`. Si alguien
commiteó una coma de más, el deploy falla en vez de publicar una sección en
blanco.

**Apaga el modo edición** en la versión publicada. `EDICION_HABILITADA` pasa a
`false` solo en la copia que se sube. Tu repo no se toca.

**Excluye las fotos sin autorización.** Cualquier item con `autorizado: false`
se elimina del sitio publicado. Los archivos siguen en el repo privado. Es la
diferencia entre tener una foto guardada y publicarla en internet, que es
justamente el permiso que todavía no pediste.

---

## Dos cosas que te van a confundir

**Los embeds de LinkedIn se van a ver en Pages y no en el stand.** En Pages hay
internet, así que `navigator.onLine` da `true` y los iframes cargan. En la
computadora del evento no. **No uses Pages para decidir si algo se ve bien.**
Probá siempre con doble clic y el WiFi apagado.

**Linux distingue mayúsculas y Windows no.** Si en tu máquina anda
`Foto.JPG` referenciada como `foto.jpg`, en Pages va a dar 404. Ya revisé todas
las rutas del proyecto y están bien; tenelo en cuenta al agregar fotos nuevas.

---

## Si querés que no aparezca en Google

Creá `robots.txt` en la raíz:

```
User-agent: *
Disallow: /
```

Evita la indexación. **No evita el acceso**: quien tenga la URL entra igual.
