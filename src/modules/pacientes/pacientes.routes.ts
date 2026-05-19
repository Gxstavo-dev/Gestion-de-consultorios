import { Router } from "express";
import {
  registroPaciente,
  PacientePorNombre,
  PacientePorId,
  pacientes,
  borrarPaciente,
  actualizarDatos,
} from "./pacientes.controller";

const rutasPacientes = Router();

rutasPacientes.post("/", registroPaciente); // registrar a un paciente
rutasPacientes.get("/", pacientes); // obtener a todos los pacientes
rutasPacientes.get("/buscar", PacientePorNombre); // buscar un paciente por nombre
rutasPacientes.get("/:id", PacientePorId); // obtener un paciente por id
rutasPacientes.put("/:id", actualizarDatos); // actualizar datos del paciente
rutasPacientes.delete("/:id", borrarPaciente); // para eliminar al paciente

export default rutasPacientes;
