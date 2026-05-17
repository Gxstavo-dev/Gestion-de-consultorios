import express from "express";

import authRoutes from "./modules/auth/auth.routes"; // rutas relacionados con auth
import pacientesRoutes from "./modules/pacientes/pacientes.routes"; // rutas para los pacientes
import citasRoutes from "./modules/citas/citas.routes"; // rutas para las citas/sesiones
import notasRoutes from "./modules/notas/notas.routes"; // rutas para las notas de sesion
import seguimientoRoutes from "./modules/seguimientos/seguimiento.routes"; // rutas para el seguimiento emocional
import pagosRoutes from "./modules/pagos/pagos.routes"; // rutas para los pagos

const app = express();
app.use(express.json()); // para poder recibir objetos json desde el frontend

app.use("/api/auth", authRoutes); // rutas de autenticacion
app.use("/api/pacientes", pacientesRoutes); // rutas de pacientes
app.use("/api/citas", citasRoutes); // rutas de citas
app.use("/api/notas", notasRoutes); // rutas de notas
app.use("/api/seguimiento", seguimientoRoutes); // rutas de seguimiento emocional
app.use("/api/pagos", pagosRoutes); // rutas de pagos

export default app;
