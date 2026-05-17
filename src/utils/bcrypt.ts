// archivo para encriptar y comparar contraseñas

import bcrypt from "bcrypt";

const VUELTAS = 10; // la veces que hasheara la contraseña

// para encriptar la contraseña
export async function encriptar(contraseña: string): Promise<string> {
  return await bcrypt.hash(contraseña, VUELTAS);
}
// para compararlas
export async function comparar(
  contraseña: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(contraseña, hash);
}
