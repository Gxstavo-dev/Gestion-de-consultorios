import { ROLES } from "../constants/roles";

export default interface psicologos {
  id: string;
  supabaseId?: string;
  nombre: string;
  email: string;
  password: string;
  rol: ROLES;
  creado_en: string;
}
