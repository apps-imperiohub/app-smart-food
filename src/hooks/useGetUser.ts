// api/user.api.ts
import { storageService } from "@/services/storage.service";
import type { Usuario } from "@/types/user";

export const getUser = async (): Promise<Usuario> => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/user/cmlsosony000184uvmebaeoyo",
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const userData = data.data; // Extraemos el usuario

    console.log("✅ Usuario obtenido de API:", userData);

    // ¡IMPORTANTE! Guardar en storage automáticamente
    await storageService.saveUser(userData);

    return userData;
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    throw error;
  }
};
