export const SUSCRIPCION = {
  AUTONOMO: "autonomo",
  CLINICA: "clinica",
} as const;

export type SUSCRIPCIONES = (typeof SUSCRIPCION)[keyof typeof SUSCRIPCION];
