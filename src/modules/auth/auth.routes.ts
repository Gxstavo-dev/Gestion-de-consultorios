import { Router } from "express";
import { verificacion } from "../../middlewares/verificarToken";

const rutasAuth = Router();

rutasAuth.post("/login"); // iniciar sesion
rutasAuth.post("/registro"); // registrar nuevo psicologo
rutasAuth.post("/logout", verificacion); // cerrar sesion
rutasAuth.get("/me", verificacion); // obtener usuario actual

export default rutasAuth;
