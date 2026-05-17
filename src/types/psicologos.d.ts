import { ROLES } from "../constants/roles";
import { SUSCRIPCION } from "../constants/suscripcion";

export default interface psicologos {
  id: string;
  supabaseId?: string;
  nombre: string;
  email: string;
  password: string;
  rol: ROLES;
  suscripcion: SUSCRIPCION;
  creado_en: string;
}
