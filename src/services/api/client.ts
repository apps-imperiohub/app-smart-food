import axios, { AxiosInstance } from "axios";

const DEFAULT_API_URL = process.env.API_URL || "http://localhost:3000";

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${DEFAULT_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Crear un cliente configurado para el browser/SDK.
 * - `baseURL` puede ser el host sin `/api` final o con él (se normaliza).
 */
export function createApiClient(baseURL?: string): AxiosInstance {
  const url = baseURL || DEFAULT_API_URL;
  const normalized = url.endsWith("/api")
    ? url
    : `${url.replace(/\/$/, "")}/api`;
  return axios.create({
    baseURL: normalized,
    headers: { "Content-Type": "application/json" },
  });
}

export { DEFAULT_API_URL as API_URL };
