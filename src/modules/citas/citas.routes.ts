import { Router } from "express";
import {
  citaPorId,
  citas,
  crearCitas,
  citasPorIdPaciente,
  actualizarCita,
  reprogramarPorId,
  eliminarCitadID,
} from "./citas.controller";

const rutasCitas = Router();

rutasCitas.post("/", crearCitas); // agendar nueva cita
rutasCitas.get("/", citas); // obtener todas las citas
rutasCitas.get("/paciente", citasPorIdPaciente); // obtener citas de un paciente
rutasCitas.get("/:id", citaPorId); // obtener cita por ID
rutasCitas.patch("/:id/estado", actualizarCita); // actualizar estado de la cita
rutasCitas.put("/reprogramar", reprogramarPorId); // reprogramar cita
rutasCitas.delete("/eliminar", eliminarCitadID); // cancelar cita

export default rutasCitas;
