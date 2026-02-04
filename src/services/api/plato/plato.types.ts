export type TamanoPlato = "S" | "M" | "L";

export type PlatoTamanoInput = {
  tamano: TamanoPlato;
  precio: number;
};

export type IngredienteInput = {
  nombre: string;
  precioExtra?: number | null;
};

export type CreatePlatoDto = {
  nombre: string;
  descripcion?: string | null;
  imagen?: string | null;
  activo?: boolean;
  precios?: PlatoTamanoInput[];
  ingredientes?: IngredienteInput[];
};

export type UpdatePlatoDto = {
  nombre?: string;
  descripcion?: string | null;
  imagen?: string | null;
  activo?: boolean;
  precios?: PlatoTamanoInput[];
  ingredientes?: IngredienteInput[];
};

export type PlatoTamano = {
  id: string;
  platoId: string;
  tamano: TamanoPlato;
  precio: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Ingrediente = {
  id: string;
  platoId: string;
  nombre: string;
  precioExtra: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Plato = {
  id: string;
  nombre: string;
  descripcion: string | null;
  imagen: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  precios: PlatoTamano[];
  ingredientes: Ingrediente[];
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};
