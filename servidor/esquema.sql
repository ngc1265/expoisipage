-- ══════════════════════════════════════════════════════════════════
-- Esquema del sitio del stand · Postgres
--
-- Decisión de diseño: el contenido se guarda como JSONB, no como
-- tablas normalizadas por sección.
--
-- Por qué: cada sección tiene una forma distinta (el grafo de
-- incumbencias, los pósters, los testimonios de LinkedIn) y esa forma
-- todavía está cambiando. Normalizar ahora significa una migración de
-- esquema cada vez que alguien agrega un campo, doce días antes de la
-- Expo. JSONB acepta el cambio sin ALTER TABLE.
--
-- El precio es que Postgres no valida la estructura por vos. Lo
-- compensamos con: (a) el frontend tolera campos faltantes, y (b) toda
-- escritura queda versionada, así que un dato roto se revierte.
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS secciones (
  clave           TEXT PRIMARY KEY,          -- 'proyectos', 'incumbencias', ...
  datos           JSONB NOT NULL,            -- { PROYECTOS: [...], INTRO: {...} }
  version         INTEGER NOT NULL DEFAULT 1,
  actualizado_en  TIMESTAMPTZ NOT NULL DEFAULT now(),
  actualizado_por TEXT
);

-- Historial completo. Nada se pisa: cada guardado deja la versión
-- anterior acá. Es la red de contención de un sitio donde entra
-- cualquiera con la clave compartida.
CREATE TABLE IF NOT EXISTS secciones_historial (
  id              BIGSERIAL PRIMARY KEY,
  clave           TEXT NOT NULL REFERENCES secciones(clave) ON DELETE CASCADE,
  datos           JSONB NOT NULL,
  version         INTEGER NOT NULL,
  guardado_en     TIMESTAMPTZ NOT NULL DEFAULT now(),
  guardado_por    TEXT
);
CREATE INDEX IF NOT EXISTS ix_hist_clave ON secciones_historial (clave, version DESC);

-- Archivos subidos desde el modo edición.
-- El binario NO va en Postgres: va al volumen del disco. Acá queda
-- solo el registro, para saber quién subió qué y poder limpiar.
CREATE TABLE IF NOT EXISTS medios (
  id            BIGSERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL UNIQUE,        -- nombre en disco
  nombre_orig   TEXT,
  tipo          TEXT NOT NULL,               -- image/jpeg, video/mp4, ...
  bytes         BIGINT NOT NULL,
  subido_en     TIMESTAMPTZ NOT NULL DEFAULT now(),
  subido_por    TEXT
);

-- Sesiones de edición. Token opaco en cookie httpOnly.
-- No usamos JWT a propósito: con una tabla podés cerrar todas las
-- sesiones abiertas con un DELETE si la clave se filtra.
CREATE TABLE IF NOT EXISTS sesiones (
  token       TEXT PRIMARY KEY,
  nombre      TEXT NOT NULL,                 -- quién dijo ser
  creada_en   TIMESTAMPTZ NOT NULL DEFAULT now(),
  expira_en   TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_sesiones_exp ON sesiones (expira_en);
