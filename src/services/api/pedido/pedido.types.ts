import type { TamanoPlato } from "../plato/plato.types";

export type PedidoItem = {
  id: string;
  pedidoId: string;
  platoId?: string;
  tamano?: TamanoPlato;
  cantidad: number;
  precio: string;
  createdAt: string;
  updatedAt: string;
};

export type PedidoItemBebida = {
  id: string;
  pedidoId: string;
  bebidaId: string;
  cantidad: number;
  precio: string;
  createdAt: string;
  updatedAt: string;
};

export type PedidoItemSalsa = {
  id: string;
  pedidoId: string;
  salsaId: string;
  cantidad: number;
  precio: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePedidoDto = {
  userId: string;
  direccionEnvioId: string;
  items?: PedidoItem[];
  bebidas?: PedidoItemBebida[];
  salsas?: PedidoItemSalsa[];
  subtotal: string | number;
  costoEnvio?: string | number;
  total: string | number;
  notas?: string | null;
};

export type UpdatePedidoDto = Partial<CreatePedidoDto> & {
  estado?: string;
};

export type Pedido = {
  id: string;
  numeroPedido: number;
  userId: string;
  direccionEnvioId: string;
  estado: string;
  subtotal: string;
  costoEnvio: string;
  total: string;
  notas?: string | null;
  createdAt: string;
  updatedAt: string;
  items?: PedidoItem[];
  bebidas?: PedidoItemBebida[];
  salsas?: PedidoItemSalsa[];
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};
