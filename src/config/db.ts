import postgres from "postgres";
import { env } from "./env";

// conexion a la base de datos
const sql = postgres({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE,
  username: env.USER_DATABASE,
  password: env.DATABASE_PASSWORD,
});

export default sql;
