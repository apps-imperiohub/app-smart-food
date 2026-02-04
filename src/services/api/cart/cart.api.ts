import { apiClient } from "../client";
import type {
  Cart,
  CartItemPlato,
  CartItemBebida,
  CartItemSalsa,
  AddPlatoToCartDto,
  UpdateCartItemDto,
  AddBebidaToCartDto,
  UpdateCartBebidaDto,
  AddSalsaToCartDto,
  UpdateCartSalsaDto,
  ApiResponse,
} from "./cart.types";

export const cartApi = {
  /**
   * Obtener o crear el carrito del usuario actual
   */
  getCart: async (userId?: Cart["userId"]): Promise<Cart> => {
    const response = await apiClient.get<ApiResponse<Cart>>("/cart", {
      params: userId ? { userId } : undefined,
    });
    return response.data.data;
  },

  /**
   * Agregar un plato al carrito
   */
  addPlato: async (
    userId: Cart["userId"],
    data: AddPlatoToCartDto,
  ): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      "/cart/plato",
      data,
      {
        params: { userId },
      },
    );
    return response.data.data;
  },

  /**
   * Actualizar un item del carrito
   */
  updateItem: async (
    itemId: CartItemPlato["id"],
    data: UpdateCartItemDto,
  ): Promise<Cart> => {
    const response = await apiClient.put<ApiResponse<Cart>>(
      `/cart/item/${itemId}`,
      data,
    );
    return response.data.data;
  },

  /**
   * Remover un item del carrito
   */
  removeItem: async (itemId: CartItemPlato["id"]): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      `/cart/item/${itemId}`,
    );
    return response.data.data;
  },

  /**
   * Agregar una bebida al carrito
   */
  addBebida: async (
    userId: Cart["userId"],
    data: AddBebidaToCartDto,
  ): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      "/cart/bebida",
      data,
      {
        params: { userId },
      },
    );
    return response.data.data;
  },

  /**
   * Actualizar cantidad de bebida en el carrito
   */
  updateBebida: async (
    cartId: Cart["id"],
    bebidaId: CartItemBebida["bebidaId"],
    data: UpdateCartBebidaDto,
  ): Promise<Cart> => {
    const response = await apiClient.put<ApiResponse<Cart>>(
      `/cart/${cartId}/bebida/${bebidaId}`,
      data,
    );
    return response.data.data;
  },

  /**
   * Remover una bebida del carrito
   */
  removeBebida: async (
    cartId: Cart["id"],
    bebidaId: CartItemBebida["bebidaId"],
  ): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      `/cart/${cartId}/bebida/${bebidaId}`,
    );
    return response.data.data;
  },

  /**
   * Agregar una salsa al carrito
   */
  addSalsa: async (
    userId: Cart["userId"],
    data: AddSalsaToCartDto,
  ): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      "/cart/salsa",
      data,
      {
        params: { userId },
      },
    );
    return response.data.data;
  },

  /**
   * Actualizar cantidad de salsa en el carrito
   */
  updateSalsa: async (
    cartId: Cart["id"],
    salsaId: CartItemSalsa["salsaId"],
    data: UpdateCartSalsaDto,
  ): Promise<Cart> => {
    const response = await apiClient.put<ApiResponse<Cart>>(
      `/cart/${cartId}/salsa/${salsaId}`,
      data,
    );
    return response.data.data;
  },

  /**
   * Remover una salsa del carrito
   */
  removeSalsa: async (
    cartId: Cart["id"],
    salsaId: CartItemSalsa["salsaId"],
  ): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      `/cart/${cartId}/salsa/${salsaId}`,
    );
    return response.data.data;
  },

  /**
   * Limpiar el carrito
   */
  clearCart: async (cartId: Cart["id"]): Promise<Cart> => {
    const response = await apiClient.patch<ApiResponse<Cart>>(
      `/cart/${cartId}/clear`,
    );
    return response.data.data;
  },

  /**
   * Eliminar el carrito
   */
  deleteCart: async (cartId: Cart["id"]): Promise<void> => {
    await apiClient.delete(`/cart/${cartId}`);
  },
};
