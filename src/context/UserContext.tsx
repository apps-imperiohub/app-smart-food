// context/UserContext.tsx
import { getUser } from "@/hooks/useGetUser";
import { storageService } from "@/services/storage.service";
import type { Usuario } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: Usuario | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  updateUser: (updates: Partial<Usuario>) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario al iniciar la app
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // PASO 1: Intentar cargar desde storage (inmediato)
      const storedUser = await storageService.getUser();

      if (storedUser) {
        console.log("📦 Usuario cargado desde storage:", storedUser);
        setUser(storedUser);
      }

      // PASO 2: Actualizar desde API (en segundo plano)
      try {
        const freshUser = await getUser(); // Esta función ya guarda en storage
        setUser(freshUser);
        console.log("🔄 Usuario actualizado desde API");
      } catch (apiError) {
        // Si no hay internet, seguimos con los datos del storage
        console.log("⚠️ Usando datos de storage (offline)");
      }
    } catch (error) {
      console.error("❌ Error cargando usuario:", error);
      setError("Error al cargar usuario");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const updateUser = async (updates: Partial<Usuario>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await storageService.saveUser(updatedUser);
  };

  const logout = async () => {
    await storageService.clearUserData(); // Necesitas crear esta función
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser, updateUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }
  return context;
};
