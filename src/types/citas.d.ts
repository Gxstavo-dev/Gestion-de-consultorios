import { ESTADO_CITA } from "../constants/estados";
import { FRECUENCIA } from "../constants/frecuencias";

export interface citas {
  id: string;
  paciente_id: string;
  fecha: Date;
  hora: string;
  duracion_min: number;
  estado: ESTADO_CITA;
  frecuencia: FRECUENCIA;
  notas_previas: string;
  creado_en: string;
}
