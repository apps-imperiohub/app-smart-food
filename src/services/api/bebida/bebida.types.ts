export type CreateBebidaDto = {
  nombre: string;
  precio: number;
  imagen?: string | null;
  activo?: boolean;
};

export type UpdateBebidaDto = {
  nombre?: string;
  precio?: number;
  imagen?: string | null;
  activo?: boolean;
};

export type Bebida = {
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
