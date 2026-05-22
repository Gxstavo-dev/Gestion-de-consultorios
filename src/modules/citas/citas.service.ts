import sql from "../../config/db";
import type { citasPaciente } from "./citas.schema";
import type { citas } from "../../types/citas";
import { ESTADO_CITA } from "../../constants/estados";

// funcion para crear una cita en la base de datos
export async function crearCita(datos: citasPaciente) {
  return await sql`
    INSERT INTO citas (paciente_id,fecha,hora,duracion_min,estado,frecuencia,notas_previas)
    VALUES(${datos.paciente_id},${datos.fecha},${datos.hora},${datos.duracion_min},${datos.estado},${datos.frecuencia},${datos.notas_previas})
  `;
}

// funcion para obtener todas las citas
export async function obtenerCitas(): Promise<citas[]> {
  return await sql<citas[]>`
    SELECT * FROM citas
    `;
}

// funcion para obtener la cita por id
export async function obtenerCitaPorId(id: string) {
  const [cita] = await sql<citas[]>`SELECT * FROM citas WHERE id = ${id}`;
  if (!cita) throw new Error("No existe esa cita aun");
  return cita;
}

// funcion para obtener las citas por id de un paciente
export async function obtenerCitasPorId(idPaciente: string): Promise<citas[]> {
  return await sql<citas[]>`
    SELECT *
    FROM citas
    INNER JOIN pacientes ON citas.paciente_id = pacientes.id
    WHERE citas.paciente_id = ${idPaciente}
    `;
}

export async function actualizarEstadoCita(
  id: string,
  estado: citas["estado"], // accedemos al enum del estado que esta en el tipado de citas
) {
  if (!Object.values(ESTADO_CITA).includes(estado))
    throw new Error("Estado invalido");

  const [cita] = await sql<citas[]>`
    UPDATE citas
    SET estado = ${estado}
    WHERE id = ${id}
    RETURNING *
    `;
  if (!cita) throw new Error("Ocurrio un error al actualizar la cita");
  return cita;
}
