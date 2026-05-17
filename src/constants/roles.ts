// roles del sistema
export const ROLES = {
  ADMIN: "admin", // control total del sistema
  PSICOLOGO: "psicologo", // gestiona sus pacientes
} as const;

// obtiene los valores del objeto como tipo: "admin" | "psicologo"
export type Rol = (typeof ROLES)[keyof typeof ROLES];
