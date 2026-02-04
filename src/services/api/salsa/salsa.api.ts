import { apiClient } from "../client";
import type {
  Salsa,
  CreateSalsaDto,
  UpdateSalsaDto,
  ApiResponse,
} from "./salsa.types";

export const salsaApi = {
  getAll: async (incluirInactivos = false): Promise<Salsa[]> => {
    const response = await apiClient.get<ApiResponse<Salsa[]>>("/salsa", {
      params: { incluirInactivos },
    });
    return response.data.data;
  },

  getById: async (id: Salsa["id"]): Promise<Salsa> => {
    const response = await apiClient.get<ApiResponse<Salsa>>(`/salsa/${id}`);
    return response.data.data;
  },

  create: async (data: CreateSalsaDto): Promise<Salsa> => {
    const response = await apiClient.post<ApiResponse<Salsa>>("/salsa", data);
    return response.data.data;
  },

  update: async (id: Salsa["id"], data: UpdateSalsaDto): Promise<Salsa> => {
    const response = await apiClient.put<ApiResponse<Salsa>>(
      `/salsa/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: Salsa["id"]): Promise<void> => {
    await apiClient.delete(`/salsa/${id}`);
  },

  deactivate: async (id: Salsa["id"]): Promise<Salsa> => {
    const response = await apiClient.patch<ApiResponse<Salsa>>(
      `/salsa/${id}/deactivate`,
    );
    return response.data.data;
  },
};
