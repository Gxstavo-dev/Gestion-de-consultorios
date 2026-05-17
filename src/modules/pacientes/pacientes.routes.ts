import { Router } from "express";

const rutasPacientes = Router();

rutasPacientes.post("/"); // registrar a un paciente
rutasPacientes.get("/"); // obtener a todos los pacientes
rutasPacientes.get("/:id"); // obtener un paciente por id
rutasPacientes.get("/buscar"); // buscar un paciente por nombre
rutasPacientes.put("/:id"); // actualizar datos del paciente
rutasPacientes.delete("/:id"); // para eliminar al paciente

export default rutasPacientes;
