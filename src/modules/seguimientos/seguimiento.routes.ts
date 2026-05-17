import { Router } from "express";

const rutasSeguimiento = Router();

rutasSeguimiento.post("/"); // registrar escala de la sesion
rutasSeguimiento.get("/paciente/:id"); // obtener el historial de un paciente
rutasSeguimiento.get("/:id"); // obtener registro por id
rutasSeguimiento.put("/:id"); // editar registro
rutasSeguimiento.delete("/:id"); // eliminar registro

export default rutasSeguimiento;
