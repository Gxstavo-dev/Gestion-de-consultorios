import sql from "../../config/db";
import type { paciente } from "./pacientes.schema"; // esquema de los datos del paciente
import type { pacientes } from "../../types/pacientes"; // tipado del paciente

// funcion para crear un usuario
// promise<pacientes> significa que la funcion devuelve una promesa
// que cuando se resuelva va a tener un objeto de tipo pacientes
// pacientes es el tipado de la fila de la base de datos
export async function registrarPaciente(datos: paciente): Promise<pacientes> {
  // si no existe lo registramos
  // sql devuelve un pendingquery que se comporta como una promesa
  // al hacer await obtenemos un array de filas tipo pacientes[]
  // con [paciente] destructuramos y agarramos solo el primer elemento
  const [paciente] = await sql`
    INSERT INTO pacientes (nombre,apellido,email,telefono,fecha_nacimiento,motivo_consulta,diagnostico,contacto_emergencia,telefono_emergencia)
    VALUES (${datos.nombre ?? null}, ${datos.apellido ?? null},${datos.email ?? null},${datos.telefono ?? null},${datos.fecha_nacimiento ?? null},${datos.motivo_consulta ?? null},${datos.diagnostico ?? null},${datos.contacto_emergencia ?? null},${datos.telefono_emergencia ?? null})
    RETURNING nombre,apellido,email,telefono,fecha_nacimiento,motivo_consulta,diagnostico,contacto_emergencia,telefono_emergencia
    `;
  // usamos as pacientes porque sql sin el generico <pacientes[]>
  // devuelve row[] que es un tipo generico, no el nuestro
  return paciente as pacientes;
}

// para obtener todos los pacientes de la tabla pacientes y esto tiene como retorno una promesa de pacientes
// promise<pacientes[]> significa que devuelve una promesa
// que al resolverse da un array de objetos pacientes
export async function obtenerPacientes(): Promise<pacientes[]> {
  // aca si usamos <pacientes[]> en sql para que typescript sepa
  // que el resultado es un array de pacientes y no row[]
  return await sql<pacientes[]>`
    SELECT * FROM pacientes`;
}

// para obtener los datos del usuario si es que existe
// no ponemos promise<pacientes> pero typescript lo infiere solo
// porque sql<pacientes[]> devuelve pendingquery<pacientes[]>
// y pendingquery extiende promise<rowlist<pacientes[]>>
// rowlist incluye pacientes[] adentro, entonces al destructurar
// con [paciente] obtenemos un solo paciente de tipo pacientes
export async function obtenerDatosPacienteId(id: string) {
  const [paciente] = await sql<pacientes[]>`
    SELECT * FROM pacientes WHERE id=${id}
    `;

  if (!paciente) throw new Error("No existe ese usuario");
  return paciente;
}

// obtener datos del paciente por el nombre
// promise<pacientes[]> es el tipo de retorno explicito
// asi sabemos que siempre devuelve un array aunque este vacio
export async function obtenerPacientesPorNombre(
  nombre: string,
): Promise<pacientes[]> {
  return await sql<pacientes[]>`
    SELECT * FROM pacientes WHERE nombre = ${nombre}
    `;
}

// actualizar los datos del paciente
// el parametro datos usa tipos bien especificos de typescript:
// - pick<pacientes, 'id'>: agarra solo la propiedad id de pacientes
// - partial<omit<pacientes, 'id' | 'creado_en'>>: toma todas las
//   propiedades de pacientes excepto id y creado_en, y las vuelve
//   opcionales con partial
// - la & une ambos tipos: obligatorio pasar id, el resto es opcional
// esto evita pasar creado_en que no se deberia actualizar
export async function actualizarDatosPaciente(
  datos: Pick<pacientes, "id"> & Partial<Omit<pacientes, "id" | "creado_en">>,
) {
  // ?? null convierte undefined en null porque postgres.js
  // no acepta undefined como parametro, solo null
  const [paciente] = await sql`
    UPDATE pacientes
    SET nombre = ${datos.nombre ?? null}, apellido = ${datos.apellido ?? null}, email = ${datos.email ?? null}, telefono = ${datos.telefono ?? null}, fecha_nacimiento = ${datos.fecha_nacimiento ?? null}, motivo_consulta = ${datos.motivo_consulta ?? null}, diagnostico = ${datos.diagnostico ?? null}, contacto_emergencia = ${datos.contacto_emergencia ?? null}, telefono_emergencia = ${datos.telefono_emergencia ?? null}
    WHERE id = ${datos.id}
    RETURNING id,nombre,apellido,email,telefono,fecha_nacimiento,motivo_consulta,diagnostico,contacto_emergencia,telefono_emergencia
    `;
  return paciente;
}

// para eliminar al paciente de la tabla
export async function eliminarPaciente(id: string) {
  return await sql`
    DELETE FROM pacientes WHERE id = ${id}
    `;
}
