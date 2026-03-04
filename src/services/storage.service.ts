// services/storage.service.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Usuario } from "@/types/user";

// Keys para almacenamiento
const STORAGE_KEYS = {
  USER: "@app:user",
  TOKEN: "@app:token",
  CART: "@app:cart",
  ADDRESSES: "@app:addresses",
};

export const storageService = {
  // ===== GUARDAR DATOS =====
  saveUser: async (user: Usuario) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, jsonValue);
      console.log("✅ Usuario guardado en storage");
    } catch (error) {
      console.error("❌ Error guardando usuario:", error);
    }
  },

  // ===== OBTENER DATOS =====
  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("❌ Error obteniendo usuario:", error);
      return null;
    }
  },
  clearUserData: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      console.log("✅ Datos de usuario eliminados del storage");
    } catch (error) {
      console.error("❌ Error eliminando datos de usuario:", error);
    }
  },
};
