import type { Request, Response } from "express"; // tipado de res y req de express
import { login, registrar, obtenerUsuarioPorId } from "./auth.service"; // para registrar o iniciar sesion
import { loginEsquema, registroEsquema } from "./auth.schema"; // para comprobacion de datos

// iniciar sesion
export const iniciarSesion = async (req: Request, res: Response) => {
  try {
    // los datos que vienen del body los parseamos para que los lea el esquema creado con zod
    const datos = loginEsquema.parse(req.body);
    // obtenemos todos los datos y el token que retornamos en login de auth.service.ts
    const { usuario, token } = await login(datos); // si funciona
    // guardamos el token en una cookie
    res.cookie("token", token, {
      httpOnly: true, // para que no pueda leer el js del navegador
      secure: true, // http para produccion
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // caduce en 7 dias pero esta en milisegundos
    });
    res.json({ mensaje: "Login exitoso", usuario }); // esto lo recibira el frontend
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// registrar usuario
export const registro = async (req: Request, res: Response) => {
  try {
    // los datos que vienen del body los parseamos para que los lea el esquema creado con zod
    const datos = registroEsquema.parse(req.body);
    const usuario = await registrar(datos);
    // si se registro damos codigo 201 de creado con exito
    res.status(201).json(usuario); // y retornamos el id,nombre,email,rol y fecha de creado
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// para cerrar sesion elimina la cookie cada que cierra sesion
export const cerraSesion = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ mensaje: "Sesión cerrada" }); // para crear un snippet para el frontend mostrando el mensaje
};

// para obtener todos los datoas del usuario mirar en el archivo auth.service.ts en la ultima funcion
export const obtenerInfoUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.usuario.id);
    res.json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};
