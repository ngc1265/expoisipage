/* Crea las tablas. Idempotente: se puede correr las veces que quieras. */
"use strict";
const fs = require("fs"), path = require("path"), { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "no" ? false : { rejectUnauthorized: false }
});
(async () => {
  const sql = fs.readFileSync(path.join(__dirname, "esquema.sql"), "utf8");
  await pool.query(sql);
  console.log("Esquema aplicado.");
  await pool.end();
})().catch(e => { console.error(e); process.exit(1); });
