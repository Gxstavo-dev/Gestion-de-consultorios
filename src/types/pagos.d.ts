import { ESTADO_PAGO } from "../constants/estados";
import { METODO_PAGO } from "../constants/estados";

export interface pagos {
  id: string;
  paciente_id: string;
  cita_id: string;
  monto: number;
  metodo_pago: METODO_PAGO;
  estado: ESTADO_PAGO;
  stripe_id?: string;
  creado_en: string;
}
