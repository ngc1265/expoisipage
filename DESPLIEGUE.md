# Despliegue · frontend y backend separados

```
                 expoisi.com.ar                    api.expoisi.com.ar
                 ┌────────────────┐                ┌──────────────────┐
   visitante ───▶│  CDN estático  │──── fetch ────▶│  Railway (Node)  │
                 │  HTML/CSS/JS   │◀─── JSON ──────│  + Postgres      │
                 │  assets/ 7 MB  │                │  + volumen medios│
                 └────────────────┘                └──────────────────┘
                        ▲                                   │
                  datos/*.js (respaldo)              /medios/* (subidas)
```

**Un solo repositorio, dos servicios.** Separar el despliegue no es separar el
repo: `servidor/sembrar.js` lee `../datos/*.js` para cargar el contenido
inicial, y el modo edición exporta archivos que van a esa misma carpeta. Si
partís esto en dos repos, esas dos cosas se rompen y hay que reescribirlas.

---

## 1. Backend en Railway

1. New Project → Deploy from GitHub → `ngc1265/expoisipage`
2. Settings → **Root Directory: `servidor`**
3. New → Database → **Add PostgreSQL**
4. En el servicio de la app → Variables → **Add Reference** → `DATABASE_URL`
5. Cargar el resto de variables de `servidor/.env.ejemplo`.
   Las dos que se olvidan siempre:
   - `CLAVE_EDICION_HASH` — sale de `node clave.js "UTN+EXPO+ISI"`
   - `ORIGENES_PERMITIDOS` — **si queda vacío, ningún navegador puede usar la API**
6. Settings → **Volumes** → montar en `/datos`, y `DIR_MEDIOS=/datos/medios`
7. Settings → Networking → Custom Domain → `api.expoisi.com.ar`

> Sin volumen montado, cada deploy borra las fotos y videos que subió la gente.
> El contenedor es efímero; el volumen no. Montalo **antes** de que alguien
> suba el primer archivo.

Contenido inicial, una sola vez:

```bash
railway run node sembrar.js
```

Sin `--forzar` solo inserta lo que falta. **Con `--forzar` pisa lo que cargó la
gente** — no lo corras después del primer día.

---

## 2. Frontend en un CDN

La raíz del repo ya es el sitio: no hay build, no hay `npm install`.

**Recomendación: Cloudflare Pages.** No por gusto — por la cuota.
[Comprobado] Firebase Hosting plan Spark da **360 MB/día de transferencia**.
Los pósters pesan 7 MB: unas cuarenta visitas y el sitio queda caído por el
resto del día. Cloudflare Pages no cobra ancho de banda en el plan gratuito.
Además vas a necesitar Cloudflare igual para el DNS, así que es un panel menos.

1. Pages → Connect to Git → `ngc1265/expoisipage`
2. Framework preset: **None**. Build command: **vacío**.
   Build output directory: **`/`**
3. Custom domain → `expoisi.com.ar`

Antes del primer deploy, en `js/config.js`:

```js
var API_BASE = "https://api.expoisi.com.ar";
```

Y ese mismo valor tiene que estar en `ORIGENES_PERMITIDOS` del backend.

> Si te olvidás de uno de los dos lados, el sitio **no se rompe**: dibuja con
> los `datos/*.js` del repo y en la consola aparece el aviso. Es cómodo, pero
> también es la razón por la que este error puede pasar desapercibido varios
> días. Verificá que el botón **☁ Guardar en el servidor** aparezca al entrar
> en modo edición: si no está, la API no se está viendo.

---

## 3. DNS en NIC.ar

[Comprobado] En NIC.ar la **Delegación** solo carga nameservers; no podés
cargar registros A, CNAME ni TXT. Y **Autodelegar no es lo que necesitás**:
esa opción sirve para crear DNS propios y tiene otra función.

1. Cloudflare → agregar el sitio `expoisi.com.ar` → te da 2 nameservers
2. NIC.ar → **Agregar una nueva delegación**, uno por vez, y al final
   **Ejecutar cambios** (mucha gente omite ese paso y no se guarda)
3. En Cloudflare quedan los registros de Pages (automáticos) y el CNAME de
   `api` que te dé Railway
4. El registro de `api` va en **DNS only** (nube gris) hasta que Railway emita
   el certificado. Con el proxy naranja prendido la emisión falla.

Propagación: 24 a 48 hs.

---

## 4. Probarlo local antes de subir

Dos terminales, dos puertos: así reproducís el cross-origin de verdad. Si
probás todo en el mismo puerto no vas a detectar un error de CORS.

```bash
# Terminal 1 — backend
cd servidor && npm install
createdb expo
export DATABASE_URL="postgresql://postgres:x@127.0.0.1:5432/expo"
export PGSSL=no DIR_MEDIOS=./medios PORT=3000
export ORIGENES_PERMITIDOS="http://localhost:5500"
export URL_PUBLICA="http://localhost:3000"
export CLAVE_EDICION_HASH="$(node clave.js 'UTN+EXPO+ISI')"
node migrar.js && node sembrar.js && node servidor.js

# Terminal 2 — frontend (desde la raíz del repo)
npx serve -l 5500 .
```

Con `API_BASE = "http://localhost:3000"` en `js/config.js`, abrí
`http://localhost:5500`.

Checklist de que el puente anda:

- [ ] Modo edición pide **nombre** y después **clave**
- [ ] Aparece **☁ Guardar en el servidor** además de ⬇ Descargar
- [ ] Guardás, recargás, y el cambio sigue ahí
- [ ] Subís una foto y la miniatura carga desde `localhost:3000/medios/...`
- [ ] Apagás el backend, recargás: el sitio **sigue abriendo** con los
      `datos/*.js`, y el botón de guardar desaparece

---

## Lo que hay que revisar cada tanto

**Egress de Railway.** Los assets del repo salen por el CDN y no cuestan nada,
pero todo lo que se sube después se sirve desde Railway y sí se factura. Si
la gente empieza a cargar videos, mirá el consumo. La salida, llegado el caso,
es Cloudflare R2 (10 GB gratis y sin cargo por egress) — no está implementado.

**Créditos.** [Comprobado] Railway no tiene tier gratuito permanente. Si se
acaban, los contenedores paran sin período de gracia y el volumen se conserva
30 días antes de borrarse. El sitio queda andando en modo respaldo, pero **lo
que se cargó desde la web y no se exportó a `datos/*.js` se pierde**. Exportá
con ⬇ Descargar cambios y commiteá cada tanto: es el backup.
