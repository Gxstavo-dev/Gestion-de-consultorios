import type { Request, Response } from "express"; // tipos para request y response
import { pacientesEsquema } from "./pacientes.schema";
import {
  registrarPaciente,
  obtenerPacientesPorNombre,
  obtenerDatosPacienteId,
  obtenerPacientes,
  eliminarPaciente,
  actualizarDatosPaciente,
} from "./pacientes.service";

// registra un nuevo paciente
export async function registroPaciente(req: Request, res: Response) {
  try {
    const datos = pacientesEsquema.parse(req.body); // valida los datos del formulario
    const paciente = await registrarPaciente(datos); // guarda en la base de datos
    return res.status(201).json(paciente); // devuelve el paciente creado
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        mensaje: "Ocurrio un error al registrar al usuario",
      });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

// obtiene todos los pacientes
export async function pacientes(req: Request, res: Response) {
  try {
    const pacientes = await obtenerPacientes(); // trae todos los registros
    return res.status(200).json({ pacientes });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        mensaje: "No existe un usuario con ese nombre",
      });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

// busca un paciente por su id
export async function PacientePorId(req: Request, res: Response) {
  try {
    const idPaciente = req.body.id; // obtiene el id del cuerpo de la peticion
    const paciente = await obtenerDatosPacienteId(idPaciente); // busca en la base de datos
    return res.status(200).json({ paciente });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        mensaje: "No existe un usuario con ese nombre",
      });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

// busca pacientes por su nombre
export async function PacientePorNombre(req: Request, res: Response) {
  try {
    const nombre = req.body.nombre; // obtiene el nombre del cuerpo de la peticion
    const paciente = await obtenerPacientesPorNombre(nombre); // busca coincidencias en la base de datos
    return res.status(200).json({ paciente });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        mensaje: "No existe un usuario con ese nombre",
      });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

// elimina un paciente por su id
export async function borrarPaciente(req: Request, res: Response) {
  try {
    const id = req.body.id; // obtiene el id del cuerpo de la peticion
    const paciente = await eliminarPaciente(id); // lo elimina de la base de datos
    if (paciente)
      return res.status(200).json({ mensaje: "se borro exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        mensaje: "Error al eliminar ese usuario",
      });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

// actualiza todos los datos de un paciente (obligatorio enviar todos los campos)
export async function actualizarDatos(req: Request, res: Response) {
  try {
    const datos = { id: req.params.id as string, ...req.body }; // combina el id de la url con los datos del cuerpo
    const paciente = await actualizarDatosPaciente(datos); // actualiza en la base de datos
    return res.status(200).json({ paciente });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
        mensaje: "Error al actualizar los datos de este usuario",
      });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
