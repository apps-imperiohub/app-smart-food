export type CreateSalsaDto = {
  nombre: string;
  precio: number;
  imagen?: string | null;
  activo?: boolean;
};

export type UpdateSalsaDto = {
  nombre?: string;
  precio?: number;
  imagen?: string | null;
  activo?: boolean;
};

export type Salsa = {
  id: string;
  nombre: string;
  precio: string;
  imagen: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};
