// estados de las citas
export const ESTADO_CITA = {
  PROGRAMADA: "programada", // cita agendada
  COMPLETADA: "completada", // sesion realizada
  CANCELADA: "cancelada", // se cancelo antes de tiempo
  NO_ASISTIO: "no_asistio", // el paciente no llego
} as const;

// obtiene los valores del objeto: "programada" | "completada" | "cancelada" | "no_asistio"
export type EstadoCita = (typeof ESTADO_CITA)[keyof typeof ESTADO_CITA];

// estados de los pagos
export const ESTADO_PAGO = {
  PAGADO: "pagado", // pago completado
  PENDIENTE: "pendiente", // aun no se paga
  DEBE: "debe", // se cobrara despues
} as const;

// obtiene los valores del objeto: "pagado" | "pendiente" | "debe"
export type EstadoPago = (typeof ESTADO_PAGO)[keyof typeof ESTADO_PAGO];

// metodos de pago aceptados
export const METODO_PAGO = {
  EFECTIVO: "efectivo", // pago en efectivo
  TRANSFERENCIA: "transferencia", // transferencia bancaria
  TARJETA: "tarjeta", // pago con stripe
} as const;

// obtiene los valores del objeto: "efectivo" | "transferencia" | "tarjeta"
export type MetodoPago = (typeof METODO_PAGO)[keyof typeof METODO_PAGO];
