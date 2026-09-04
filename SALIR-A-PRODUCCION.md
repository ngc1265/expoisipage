# Salir a producción · 25 minutos

Orden pensado para que cada paso se pueda verificar antes del siguiente.
**El dominio va último y no bloquea nada**: propaga en 24–48 hs y no tenés
por qué esperarlo para estar arriba.

---

## Paso 1 · Backend en Railway (~10 min)

1. railway.com → New Project → **Deploy from GitHub repo** → `ngc1265/expoisipage`
2. Settings → **Root Directory: `servidor`**
3. New → Database → **Add PostgreSQL**
4. Servicio de la app → Variables:

   | Variable | Valor |
   |---|---|
   | `DATABASE_URL` | **Add Reference** al servicio Postgres (no la copies a mano) |
   | `CLAVE_EDICION_HASH` | la salida de `node clave.js "UTN+EXPO+ISI"` |
   | `ORIGENES_PERMITIDOS` | `https://ngc1265.github.io` |
   | `DIR_MEDIOS` | `/datos/medios` |
   | `NODE_ENV` | `production` |

5. Settings → **Volumes** → montar en `/datos`
6. Settings → Networking → **Generate Domain** → copiá la URL `*.up.railway.app`

**Verificá antes de seguir:** abrí `https://TU-URL.up.railway.app/salud`.
Tiene que decir `{"ok":true}`. Si dice `false`, la base no está enlazada.

7. Contenido inicial, una vez:
   ```bash
   railway run node sembrar.js
   ```

> El volumen se monta **antes** de que alguien suba la primera foto. Después
> es tarde: lo subido antes del volumen se pierde en el siguiente deploy.

---

## Paso 2 · Frontend en GitHub Pages (~5 min)

Es el camino más corto que tenés: el repo ya está en GitHub y es público, así
que Pages es gratis y no hay cuenta nueva que crear. Cloudflare Pages lo dejás
para cuando muevas el dominio.

1. `js/config.js` → en `API_BASE_POR_HOST`, completá la línea de
   `"ngc1265.github.io"` con la URL de Railway del paso 1
2. Commit y push a `main`
3. GitHub → Settings → Pages → Source: **GitHub Actions**

El workflow `.github/workflows/publicar.yml` corre solo. Antes de publicar
valida la sintaxis de todos los `.js` y de los scripts embebidos en los HTML:
si alguien commiteó una coma de más, **falla el deploy en vez de publicar una
sección en blanco**.

Queda en `https://ngc1265.github.io/expoisipage/`

---

## Paso 3 · Verificar (~2 min)

Abrí:

```
https://ngc1265.github.io/expoisipage/diagnostico.html
```

Esa página prueba las seis cosas que pueden fallar y, cuando algo falla, te
dice el arreglo concreto en vez de un error genérico. Buscá el cartel verde
**Listo para producción**.

Si algo está mal, el más probable es CORS: el origen exacto tiene que estar en
`ORIGENES_PERMITIDOS`, **sin barra final**. Para GitHub Pages el origen es
`https://ngc1265.github.io` (sin `/expoisipage`).

Última prueba, la que de verdad importa: entrá a cualquier sección, tocá
**✎ Editar**, poné tu nombre y la clave. Tiene que aparecer el botón
**☁ Guardar en el servidor**. Cambiá un texto, guardá, recargá. Si el cambio
sigue ahí, estás en producción.

---

## Paso 4 · Dominio (cuando tengas tiempo, no ahora)

Ver `DESPLIEGUE.md`, sección 3. Resumen: Cloudflare para el DNS (NIC.ar solo
carga nameservers), delegación en NIC.ar con **Agregar una nueva delegación**,
y acordate de **Ejecutar cambios**.

Cuando el dominio esté andando, dos cambios:

- `js/config.js` → las entradas `expoisi.com.ar` ya están cargadas apuntando a
  `https://api.expoisi.com.ar`
- Railway → agregar los dominios nuevos a `ORIGENES_PERMITIDOS`, separados por
  coma. **No borres el de GitHub Pages**: te sirve de respaldo si el dominio
  falla.

---

## Si algo se rompe en producción

El sitio **no se cae**. `js/api.js` tiene 2,5 segundos de paciencia y después
dibuja con los `datos/*.js` del repo. Los visitantes ven todo; lo único que
desaparece es la posibilidad de editar.

Eso es cómodo y es peligroso: podés estar días sin darte cuenta de que nadie
está guardando nada. **Corré `diagnostico.html` después de cada cambio de
configuración.**

## Lo único que no es reversible

Lo que se carga desde la web vive en Postgres. Si se acaban los créditos de
Railway, los contenedores paran sin período de gracia y el volumen se conserva
30 días antes de borrarse. **Exportá con ⬇ Descargar cambios y commiteá cada
tanto**: ese es el backup, y además es lo que mantiene vivo el modo respaldo.
