import sql from "../../config/db"; // para hacer las consultas
import { encriptar, comparar } from "../../utils/bcrypt"; // para encriptar y comparar la contraseña
import { generarToken } from "../../utils/jwt"; // generar el token para inicio de sesiones seguras
import type { Registro, Login } from "./auth.schema"; // para verificar el tipo (datos enviados en frontend) con zod que definimos
import type psicologos from "../../types/psicologos"; // tipar los datos del usuario

// funcion para registrar a los psicologs osea crear su cuenta
export async function registrar(datos: Registro) {
  const contraseña = await encriptar(datos.contraseña); // encripta la contraseña ingresada
  // usuario dentro de corchetes para almacenar todos sus datos que retornara despues de que sea exitosa la consulta
  // por la libreria postgresql.js nos permite interpolar las variables dentro del a consulta y que maneja para evitar inyeccioenes sql
  const [usuario] = await sql<psicologos[]>`
    INSERT INTO usuarios(nombre,email,password,rol)
  VALUES (${datos.nombre}, ${datos.email}, ${contraseña}, ${datos.rol})
  RETURNING id,nombre,email,rol,creado_en
    `;
  return usuario; // retornamos id,nombre,email,rol y cuando fue creado
}

// funcion para crear a los usuarios
export async function login(datos: Login) {
  // almacenamos todo el contenido del usuario
  const [usuario] = await sql<psicologos[]>`
    SELECT * FROM usuarios WHERE email =${datos.email}
    `;
  // si el email ingresado no coincide con ningun de la db levantamos error
  if (!usuario) throw new Error("Credenciales incorrectas");

  // comparar la contraseña ingresada con la que nos retorna usuario
  if (!usuario.password) throw new Error("Credenciales incorrectas");
  const valido = await comparar(datos.contraseña, usuario.password);

  // si la contraseña ingresado no coincide con ningun de la db levantamos error
  if (!valido) throw new Error("Credenciales incorrectas");

  // creamos el token
  const token = generarToken({
    id: usuario.id,
    email: usuario.email,
    rol: usuario.rol,
  });
  return {
    // para mostrarlo en el frontend
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
    token, // retornamos el token
  };
}

// para mostrar despues de que inicie sesion
export async function obtenerUsuarioPorId(id: string) {
  const [usuario] = await sql<psicologos[]>`
    SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = ${id}
  `;
  return usuario;
}
