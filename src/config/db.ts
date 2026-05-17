/* archivo para crear el objeto que nos permitira para usar la db y su conexion */
import postgres from "postgres";
import { env } from "./env";

import Tablas from "./database/tablas";

// conexion a la base de datos
const sql = postgres({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE,
  username: env.USER_DATABASE,
  password: env.DATABASE_PASSWORD,
});

const tablas = new Tablas(sql);

// function para crear las tablas apenas se cree la conexion
async function crearTablas() {
  try {
    await tablas.usuarios();
    await tablas.pacientes();
    await tablas.citas();
    await tablas.notas();
    await tablas.seguimiento();
    await tablas.pagos();
    console.log("tablas creadas correctamente");
  } catch (error) {
    console.error("error al crear tablas:", error);
  }
}

await crearTablas();

export default sql;
