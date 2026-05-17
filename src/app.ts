import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes"; // rutas relacionados con auth
import pacientesRoutes from "./modules/pacientes/pacientes.routes"; // rutas para los pacientes
import citasRoutes from "./modules/citas/citas.routes"; // rutas para las citas/sesiones
import notasRoutes from "./modules/notas/notas.routes"; // rutas para las notas de sesion
import seguimientoRoutes from "./modules/seguimientos/seguimiento.routes"; // rutas para el seguimiento emocional
import pagosRoutes from "./modules/pagos/pagos.routes"; // rutas para los pagos
import { verificacion } from "./middlewares/verificarToken";

const app = express();
app.use(express.json()); // para poder recibir objetos json desde el frontend
app.use(cookieParser()); // para leer cookies

app.use("/api/auth", authRoutes); // rutas de autenticacion
app.use("/api/pacientes", verificacion, pacientesRoutes); // rutas de pacientes
app.use("/api/citas", verificacion, citasRoutes); // rutas de citas
app.use("/api/notas", verificacion, notasRoutes); // rutas de notas
app.use("/api/seguimiento", verificacion, seguimientoRoutes); // rutas de seguimiento emocional
app.use("/api/pagos", verificacion, pagosRoutes); // rutas de pagos

export default app;
