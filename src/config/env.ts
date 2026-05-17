/* archivo para validar todas las variables de entorno creadas  */
import z from "zod";

const ENV = z.object({
  PORT: z.coerce.number().default(3002), // puerto
  DATABASE_URL: z.string().url(), // url que permite la conexion
  DATABASE_PASSWORD: z.string(), // contraseña de la db
  DATABASE_PORT: z.coerce.number(), // puerto de la conexion a la db de supabase
  DATABASE: z.string(), // tipo de base de de datos
  USER_DATABASE: z.string(), // usuario de la base de datos
});

// validar todas las variables de bun.env que fueron registradas en el objeto creado con zod de nuestro esquema ENV
const parse = ENV.safeParse(Bun.env);
// si falla la validacion imprimimos los errores
if (!parse.success) {
  console.error("Error con las variables de entorno: ", parse.error.issues);
  process.exit(1);
}

export const env = parse.data; //  objeto ya validado y tipado para usarlo
