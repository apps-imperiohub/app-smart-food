export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  googleId: string;
  picture: string;
  direccionnesEnvios: DireccionEnvio[];
  createdAt: string; // o Date si lo parseas
  updatedAt: string; // o Date si lo parseas
}
export interface DireccionEnvio {
  id: string;
  calle: string;
  numero: string;
  detalles: string;
  sector: string;
  ciudad: string;
  pais: string;
  nombreContacto: string;
  telefono: string;
  isDefault: boolean;
  userId: string;
  createdAt: string; // o Date si lo parseas
  updatedAt: string; // o Date si lo parseas
}
