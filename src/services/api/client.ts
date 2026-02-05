import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";

const DEFAULT_API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000" // Android Emulator → tu máquina
    : "http://localhost:3000"; // iOS Simulator / Web

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
