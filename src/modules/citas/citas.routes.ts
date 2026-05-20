import { Router } from "express";
import { crearCitas } from "./citas.controller";

const rutasCitas = Router();

rutasCitas.post("/", crearCitas); // agendar nueva cita
//rutasCitas.get("/"); // obtener todas las citas
//rutasCitas.get("/:id"); // obtener cita por ID
//rutasCitas.get("/paciente/:id"); // obtener citas de un paciente
//rutasCitas.patch("/:id/estado"); // actualizar estado de la cita
//rutasCitas.put("/:id"); // reprogramar cita
//rutasCitas.delete("/:id"); // cancelar cita

export default rutasCitas;
