import { apiClient } from "../client";
import type {
  Plato,
  CreatePlatoDto,
  UpdatePlatoDto,
  ApiResponse,
} from "./plato.types";

export const platoApi = {
  getAll: async (incluirInactivos = false): Promise<Plato[]> => {
    const response = await apiClient.get<ApiResponse<Plato[]>>("/plato", {
      params: { incluirInactivos },
    });
    return response.data.data;
  },

  getById: async (id: Plato["id"]): Promise<Plato> => {
    const response = await apiClient.get<ApiResponse<Plato>>(`/plato/${id}`);
    return response.data.data;
  },

  create: async (data: CreatePlatoDto): Promise<Plato> => {
    const response = await apiClient.post<ApiResponse<Plato>>("/plato", data);
    return response.data.data;
  },

  update: async (id: Plato["id"], data: UpdatePlatoDto): Promise<Plato> => {
    const response = await apiClient.put<ApiResponse<Plato>>(
      `/plato/${id}`,
      data,
    );
    return response.data.data;
  },

  delete: async (id: Plato["id"]): Promise<void> => {
    await apiClient.delete(`/plato/${id}`);
  },

  deactivate: async (id: Plato["id"]): Promise<Plato> => {
    const response = await apiClient.patch<ApiResponse<Plato>>(
      `/plato/${id}/deactivate`,
    );
    return response.data.data;
  },
};
