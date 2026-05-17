import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env"; // variables de entorno validadas

// extiende request para agregar los datos del usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: any; // datos del usuario que vienen del token
    }
  }
}

// verifica que el token sea valido antes de dejar pasar
export const verificacion = (
  req: Request,
  res: Response,
  next: NextFunction, // llama al siguiente middleware o al controller
) => {
  const token = req.cookies.token; // obtiene el token de la cookie

  if (!token) {
    return res.status(401).json({ mensaje: "No autorizado" }); // sin token no pasa
  }

  try {
    const decodificar = jwt.verify(token, env.JWT_SECRET); // verifica que el token sea valido
    req.usuario = decodificar; // guarda los datos del usuario en la request
    next(); // continua con la siguiente funcion
  } catch {
    return res.status(401).json({ mensaje: "Token invalido o expirado" });
  }
};
