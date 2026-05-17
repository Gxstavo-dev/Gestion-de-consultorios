import { Router } from "express";
import { verificacion } from "../../middlewares/verificarToken";
import {
  iniciarSesion,
  registro,
  cerraSesion,
  obtenerInfoUsuario,
} from "./auth.controller";

const rutasAuth = Router();

rutasAuth.post("/login", iniciarSesion); // iniciar sesion
rutasAuth.post("/registro", registro); // registrar nuevo psicologo
rutasAuth.post("/logout", verificacion, cerraSesion); // cerrar sesion
rutasAuth.get("/me", verificacion, obtenerInfoUsuario); // obtener usuario actual

export default rutasAuth;
