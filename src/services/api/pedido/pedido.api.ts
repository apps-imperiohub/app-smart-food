import { apiClient } from "../client";
import type {
  Pedido,
  CreatePedidoDto,
  UpdatePedidoDto,
  ApiResponse,
} from "./pedido.types";

export const pedidoApi = {
  getAll: async (params?: Record<string, unknown>): Promise<Pedido[]> => {
    const response = await apiClient.get<ApiResponse<Pedido[]>>("/pedido", {
      params,
    });
    return response.data.data;
  },

  getById: async (id: Pedido["id"]): Promise<Pedido> => {
    const response = await apiClient.get<ApiResponse<Pedido>>(`/pedido/${id}`);
    return response.data.data;
  },

  create: async (data: CreatePedidoDto): Promise<Pedido> => {
    const response = await apiClient.post<ApiResponse<Pedido>>("/pedido", data);
    return response.data.data;
  },

  update: async (id: Pedido["id"], data: UpdatePedidoDto): Promise<Pedido> => {
    const response = await apiClient.put<ApiResponse<Pedido>>(
      `/pedido/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: Pedido["id"]): Promise<void> => {
    await apiClient.delete(`/pedido/${id}`);
  },
};
