import type { TamanoPlato } from "../plato/plato.types";

export type ModificacionInput = {
  ingredienteId: string;
  tipo: "SIN" | "EXTRA" | "DOBLE";
};

export type AddPlatoToCartDto = {
  platoId: string;
  tamano: TamanoPlato;
  cantidad: number;
  notas?: string | null;
  modificaciones?: ModificacionInput[];
};

export type UpdateCartItemDto = {
  cantidad?: number;
  tamano?: TamanoPlato;
  notas?: string | null;
  modificaciones?: ModificacionInput[];
};

export type AddBebidaToCartDto = {
  bebidaId: string;
  cantidad: number;
};

export type UpdateCartBebidaDto = {
  cantidad: number;
};

export type AddSalsaToCartDto = {
  salsaId: string;
  cantidad: number;
};

export type UpdateCartSalsaDto = {
  cantidad: number;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
  error?: string;
};

export type CartItemBebida = {
  id: string;
  cartId: string;
  bebidaId: string;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItemSalsa = {
  id: string;
  cartId: string;
  salsaId: string;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItemPlato = {
  id: string;
  cartId: string;
  platoId: string;
  tamano: TamanoPlato;
  cantidad: number;
  notas?: string | null;
  modificaciones?: ModificacionInput[];
  createdAt: string;
  updatedAt: string;
};

export type Cart = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items?: CartItemPlato[];
  bebidas?: CartItemBebida[];
  salsas?: CartItemSalsa[];
};
