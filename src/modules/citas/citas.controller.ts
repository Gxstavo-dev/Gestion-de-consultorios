import type { Request, Response } from "express";
import { citasEsquema } from "./citas.schema";
import { crearCita } from "./citas.service";

// controlador para crear una cita
// primero validamos los datos con zod, luego llamamos al servicio
export async function crearCitas(req: Request, res: Response) {
  try {
    const datos = citasEsquema.parse(req.body);
    // validamos que los datos enviados cumplan con el esquema
    const cita = await crearCita(datos);
    // llamamos al servicio que inserta en la base de datos
    if (cita)
      return res.status(201).json({ mensaje: "Se creo con exito la cita" });
    // si todo sale bien respondemos con codigo 201 (creado)
  } catch (error) {
    // si ocurre un error en la validacion o en la base de datos lo atrapamos aca
    if (error instanceof Error) {
      // si el error es de tipo Error devolvemos un 400 con el mensaje
      return res.status(400).json({
        error: error.message,
        mensaje: "Ocurrio un error al crear la cita",
      });
    } else {
      // si el error es desconocido devolvemos un 500 (error del servidor)
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
