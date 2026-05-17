/* ---- Archivo de configuracion del servidor , en index.ts solo se levantara el servidor aqui
se configura:
  - rutas
  - metodos que aceptara
*/
import express from "express";

const app = express();
app.use(express.json()); // para poder recibir objetos json desde el frontend

export default app; // para usarla en index.ts
