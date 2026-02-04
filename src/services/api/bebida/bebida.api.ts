import { apiClient } from "../client";
import type {
  Bebida,
  CreateBebidaDto,
  UpdateBebidaDto,
  ApiResponse,
} from "./bebida.types";

export const bebidaApi = {
  getAll: async (incluirInactivos = false): Promise<Bebida[]> => {
    const response = await apiClient.get<ApiResponse<Bebida[]>>("/bebida", {
      params: { incluirInactivos },
    });
    return response.data.data;
  },

  getById: async (id: Bebida["id"]): Promise<Bebida> => {
    const response = await apiClient.get<ApiResponse<Bebida>>(`/bebida/${id}`);
    return response.data.data;
  },

  create: async (data: CreateBebidaDto): Promise<Bebida> => {
    const response = await apiClient.post<ApiResponse<Bebida>>("/bebida", data);
    return response.data.data;
  },

  update: async (id: Bebida["id"], data: UpdateBebidaDto): Promise<Bebida> => {
    const response = await apiClient.put<ApiResponse<Bebida>>(
      `/bebida/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: Bebida["id"]): Promise<void> => {
    await apiClient.delete(`/bebida/${id}`);
  },

  deactivate: async (id: Bebida["id"]): Promise<Bebida> => {
    const response = await apiClient.patch<ApiResponse<Bebida>>(
      `/bebida/${id}/deactivate`,
    );
    return response.data.data;
  },
};
