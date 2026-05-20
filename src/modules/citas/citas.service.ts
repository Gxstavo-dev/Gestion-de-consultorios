import sql from "../../config/db";
import type { citasPaciente } from "./citas.schema";
import type { citas } from "../../types/citas";

// funcion para crear una cita en la base de datos
export async function crearCita(datos: citasPaciente) {
  return await sql`
    INSERT INTO citas (paciente_id,fecha,hora,duracion_min,estado,frecuencia,notas_previas)
    VALUES(${datos.paciente_id},${datos.fecha},${datos.hora},${datos.duracion_min},${datos.estado},${datos.frecuencia},${datos.notas_previas})
  `;
}
