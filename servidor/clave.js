/* Genera el hash bcrypt de la clave de edición.
   Uso:  node clave.js "UTN+EXPO+ISI"
   Pegá la salida en la variable CLAVE_EDICION_HASH de Railway.
   La clave en sí NO se guarda en ningún archivo del repo. */
"use strict";
const bcrypt = require("bcryptjs");
const clave = process.argv[2];
if (!clave) { console.error('Uso: node clave.js "TU-CLAVE"'); process.exit(1); }
console.log(bcrypt.hashSync(clave, 12));
