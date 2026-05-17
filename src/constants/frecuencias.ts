// frecuencias de las citas
export const FRECUENCIA = {
  SEMANAL: "semanal", // sesion cada semana
  QUINCENAL: "quincenal", // sesion cada 15 dias
  MENSUAL: "mensual", // sesion cada mes
} as const;

// obtiene los valores del objeto: "semanal" | "quincenal" | "mensual"
export type Frecuencia = (typeof FRECUENCIA)[keyof typeof FRECUENCIA];
