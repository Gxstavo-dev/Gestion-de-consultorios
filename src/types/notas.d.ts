export interface notas {
  id: string;
  cita_id: string;
  paciente_id: string;
  texto: string;
  objetivos: string;
  tarea?: string;
  es_privada: boolean;
  creado_en: string;
}
