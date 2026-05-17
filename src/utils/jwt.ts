// archivo para generar y verificar los tokens
import jwt from "jsonwebtoken";
import { env } from "../config/env";

// para generar el token para la sesion
export function generarToken(datos: object) {
  return jwt.sign(datos, env.JWT_SECRET, { expiresIn: "7d" });
}
// verificar si tiene token
export function verificarToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}
