import z from "zod";

export const citasEsquema = z.object({
  paciente_id: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // DATE como string YYYY-MM-DD
  hora: z.string().regex(/^\d{2}:\d{2}$/), // TIME HH:MM
  duracion_min: z.number().int().default(50), // INT, no string
  estado: z.enum(["programada", "completada", "cancelada", "no_asistio"]),
  frecuencia: z.enum(["semanal", "quincenal", "mensual"]),
  notas_previas: z.string(),
});
export type citasPaciente = z.infer<typeof citasEsquema>;
