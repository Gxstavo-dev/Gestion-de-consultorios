import { Router } from "express";

const rutasNotas = Router();

rutasNotas.post("/"); // crear nota de la sesion
rutasNotas.get("/paciente/:id"); // obtener notas de un paciente
rutasNotas.get("/:id"); // obtener nota por id
rutasNotas.put("/:id"); // editar nota
rutasNotas.delete("/:id"); // eliminar nota

export default rutasNotas;
