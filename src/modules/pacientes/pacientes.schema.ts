import z from "zod";

// esquema de auntenticacion de datos para los pacientes
export const pacientesEsquema = z.object({
  nombre: z.string().max(100).min(1),
  apellido: z.string().max(100).min(1),
  email: z.string().email().max(100).min(1).optional(),
  telefono: z.string().max(20).min(1),
  fecha_nacimiento: z.coerce.date().optional(),
  motivo_consulta: z.string().optional(),
  diagnostico: z.string().max(200).min(1).optional(),
  contacto_emergencia: z.string().max(100).min(1).optional(),
  telefono_emergencia: z.string().max(20).min(1).optional(),
});

// z.infer -> extrae el tipo ts del esquema zod
// esto saca los objetos que tenemos definidos de manera directa
// ejemplo : email: string , nombre.string etc etc
export type paciente = z.infer<typeof pacientesEsquema>;
