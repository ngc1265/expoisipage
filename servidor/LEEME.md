# Backend del sitio · Railway + Postgres

> Los pasos de despliegue (Railway, CDN y DNS) están en **`../DESPLIEGUE.md`**.
> Este archivo es la referencia técnica de la API.

## Qué hace y qué NO hace

**No sirve el sitio.** Solo `/api/*`, `/medios/*` y `/salud`. El frontend vive
en otro dominio, en un CDN. Los 7 MB de pósters y el video no pasan nunca por
Railway, así que no consumen compute ni egress facturable.

**El sitio sigue abriendo sin este servidor.** `js/api.js` intenta traer el
contenido de la base; si falla, tarda más de 2,5 s, o se abrió con doble clic
(`file://`), dibuja con los `datos/*.js` del repo. Eso es a propósito: si
Railway se cae o se acaban los créditos, el sitio no desaparece.

---

## Las dos consecuencias de separar

**1. CORS.** `ORIGENES_PERMITIDOS` es una lista blanca estricta, no `*`. Con
`*` cualquier página de internet podría hacer un `PUT` contra esta API usando
el token de un editor logueado. La respuesta lleva `Vary: Origin`: sin eso, un
proxy o CDN puede cachear la respuesta de un origen y devolvérsela a otro.

Un preflight desde un origen no listado devuelve **403**, no 204, para que en
la consola del navegador se vea que el problema es la lista blanca.

**2. Sesiones sin cookies.** Con dos dominios la cookie de sesión sería de
tercera parte, y Safari las bloquea de entrada. Se usa **token Bearer** en el
header `Authorization`.

El frontend lo guarda en `sessionStorage`: muere al cerrar la pestaña, que en
una máquina compartida de la Facultad importa. Un XSS puede leerlo; para este
sitio (contenido público, clave compartida, sin datos personales en la base) el
riesgo es menor que tener un login que no anda en iPhone. Si algún día esto
guarda algo sensible, hay que revisar esa decisión.

---

## Modelo de datos

Una fila por sección, contenido en `JSONB`. Ver los comentarios de
`esquema.sql` para el razonamiento.

Lo importante para operar:

- **Nada se pisa.** Cada guardado copia la versión anterior a
  `secciones_historial`. Se revierte con `POST /api/revertir/:clave/:version`.
- **Concurrencia optimista.** El cliente manda la versión que tenía. Si otro
  guardó en el medio, el servidor devuelve `409` y el navegador avisa en vez
  de pisar trabajo ajeno.
- **Los binarios no van a Postgres.** Van al volumen. Un backup de la base
  que incluya los videos pesa lo mismo que la carpeta de videos.

---

## Sobre la clave compartida

Es lo que pediste: una clave, cualquiera que la tenga carga contenido. Ahora
sí se valida en el servidor (bcrypt, cost 12), así que ya no está a la vista
en el código.

Lo que **no** resuelve una clave compartida es saber quién hizo qué. Por eso
al entrar se pide un nombre, y ese nombre queda en `actualizado_por` y en cada
fila del historial. No es autenticación —alguien puede escribir cualquier
nombre— pero alcanza para reconstruir qué pasó sin acusar a nadie.

Hay freno de fuerza bruta: 10 intentos fallidos por IP y quedás 15 minutos
afuera.

**Si la clave se filtra:** cambiás `CLAVE_EDICION_HASH` y corrés
`DELETE FROM sesiones;`. Eso echa a todos los que estaban adentro.

---

## Endpoints

| Método | Ruta | Sesión | Qué hace |
|---|---|---|---|
| POST | `/api/sesion` | — | Entrar. Body: `{clave, nombre}` → devuelve `{token}` |
| GET | `/api/sesion` | — | Si hay sesión activa y de quién |
| DELETE | `/api/sesion` | — | Salir |
| GET | `/api/contenido` | — | Todas las secciones |
| GET | `/api/contenido/:clave` | — | Una sección |
| PUT | `/api/contenido/:clave` | sí | Guardar. Body: `{datos, version}` |
| GET | `/api/historial/:clave` | sí | Últimas 50 versiones |
| POST | `/api/revertir/:clave/:version` | sí | Volver a una versión |
| POST | `/api/medios` | sí | Subir archivos (campo `archivos`) |
| GET | `/api/medios` | sí | Listar lo subido |
| GET | `/salud` | — | Healthcheck de Railway |
| GET | `/` | — | Qué es este servicio (no es el sitio) |

Todo lo que pide sesión va con `Authorization: Bearer <token>`.
Las URLs que devuelve `/api/medios` son **absolutas** (`URL_PUBLICA` o el host
de la request): una ruta relativa apuntaría al CDN, que no tiene esos archivos.

Formatos admitidos al subir: `.jpg .jpeg .png .webp .gif .avif .mp4 .webm .pdf`.
Se valida por **extensión**, no por el `Content-Type` que declara el cliente:
ese se puede mentir, y además hay herramientas que mandan
`application/octet-stream` para archivos perfectamente válidos.

---

## Probarlo local

Ver `../DESPLIEGUE.md`, sección 4. Importante: levantá frontend y backend en
**puertos distintos**. Si probás los dos en el mismo puerto no vas a detectar
un error de CORS hasta que ya esté en producción.
