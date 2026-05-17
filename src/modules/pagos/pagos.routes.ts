import { Router } from "express";

const rutasPagos = Router();

rutasPagos.post("/"); // registrar pago de sesion
rutasPagos.get("/paciente/:id"); // obtener historial de pagos
rutasPagos.get("/deudas"); // obtener pacientes con deuda
rutasPagos.get("/:id"); // obtener pago por id
rutasPagos.patch("/:id/estado"); // marcar pago como completado

export default rutasPagos;
