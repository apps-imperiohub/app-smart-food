export { apiClient, createApiClient, API_URL } from "./client";
export { platoApi } from "./plato";
export { bebidaApi } from "./bebida";
export { salsaApi } from "./salsa";
export { cartApi } from "./cart";
export { pedidoApi } from "./pedido";
export type {
  TamanoPlato,
  PlatoTamanoInput,
  IngredienteInput,
  CreatePlatoDto,
  UpdatePlatoDto,
  PlatoTamano,
  Ingrediente,
  Plato,
} from "./plato/plato.types";

export type {
  CreateBebidaDto,
  UpdateBebidaDto,
  Bebida,
} from "./bebida/bebida.types";

export type {
  CreateSalsaDto,
  UpdateSalsaDto,
  Salsa,
} from "./salsa/salsa.types";

export type {
  ModificacionInput,
  AddPlatoToCartDto,
  UpdateCartItemDto,
  AddBebidaToCartDto,
  UpdateCartBebidaDto,
  AddSalsaToCartDto,
  UpdateCartSalsaDto,
  CartItemBebida,
  CartItemSalsa,
  Cart,
} from "./cart/cart.types";

export type { ApiResponse as PlatoApiResponse } from "./plato/plato.types";
export type { ApiResponse as BebidaApiResponse } from "./bebida/bebida.types";
export type { ApiResponse as SalsaApiResponse } from "./salsa/salsa.types";
export type { ApiResponse as CartApiResponse } from "./cart/cart.types";
export type {
  CreatePedidoDto,
  UpdatePedidoDto,
  Pedido,
} from "./pedido/pedido.types";
