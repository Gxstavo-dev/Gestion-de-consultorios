import { Router } from "express";

const rutasAuth = Router();

rutasAuth.post("/login"); // iniciar sesion
rutasAuth.post("/registro"); // registrar nuevo psicologo
rutasAuth.post("/logout"); // cerrar sesion
rutasAuth.get("/me"); // obtener usuario actual

export default rutasAuth;
