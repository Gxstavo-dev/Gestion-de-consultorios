import z from "zod";

export const loginEsquema = z.object({
  email: z.string().email(),
  contraseña: z.string().min(1),
});

export const registroEsquema = z.object({
  email: z.string().email(),
  nombre: z.string().max(100), // maximo de caracteres que puede tener
  contraseña: z.string().min(3), // minimo de caracteres que puede tener
  rol: z.enum(["admin", "psicologo"]).default("psicologo"),
});

// z.infer -> extrae el tipo ts del esquema zod
// esto saca los objetos que tenemos definidos de manera directa
// ejemplo : email: string , nombre.string etc etc
export type Login = z.infer<typeof loginEsquema>;
export type Registro = z.infer<typeof registroEsquema>;
