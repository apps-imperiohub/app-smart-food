import { GoogleUserInfo } from "@/types/googleAuth";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { secureStorage } from "../../utils/storage";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  // Estados
  const [user, setUser] = useState<GoogleUserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Generar la redirect URI
  const redirectUri = AuthSession.makeRedirectUri({});
  console.log("Redirect URI generada por makeRedirectUri:", redirectUri);

  // Configuración de Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "667905950251-eh1fo927rt9m5n16bmn5u33jc5vs7mp0.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  // 1. Al iniciar, verificar si hay usuario guardado
  useEffect(() => {
    checkExistingSession();
  }, []);

  // 2. Manejar la respuesta de Google
  useEffect(() => {
    console.log("Response completa:", response);

    if (response?.type === "success") {
      console.log("Authentication:", response.authentication);
      console.log("Redirect URI from response:", (response as any)?.url);

      // Procesar el login exitoso
      if (response.authentication) {
        handleSuccessfulLogin(response.authentication);
      }
    }

    if (response?.type === "error") {
      console.log("Error details:", response.error);
      console.log("Error params:", (response as any)?.params);
      setLoading(false);
    }

    if (response?.type === "cancel") {
      console.log("Usuario canceló el login");
      setLoading(false);
    }
  }, [response]);

  // Verificar si ya hay una sesión activa
  const checkExistingSession = async () => {
    try {
      console.log("🔍 Verificando sesión existente...");

      // Intentar obtener datos del usuario guardados
      const userData = await secureStorage.getItem("google_user_data");

      if (userData) {
        const parsedUser: GoogleUserInfo = JSON.parse(userData);
        console.log("✅ Usuario encontrado en storage:", parsedUser.email);
        setUser(parsedUser);
      } else {
        console.log("❌ No hay usuario en storage");
      }
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  // Manejar login exitoso
  const handleSuccessfulLogin = async (
    authentication: AuthSession.TokenResponse,
  ) => {
    try {
      setLoading(true);
      console.log(
        "🔐 Token recibido:",
        authentication.accessToken.substring(0, 20) + "...",
      );

      // Obtener información del usuario con el token
      const userInfo = await fetchUserInfo(authentication.accessToken);
      console.log("👤 Información del usuario obtenida:", userInfo.email);

      // Guardar datos del usuario
      await saveUserData(userInfo);

      // Actualizar estado
      setUser(userInfo);

      console.log("✅ Login completado exitosamente!");
    } catch (error) {
      console.error("❌ Error en handleSuccessfulLogin:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener información del usuario desde Google API
  const fetchUserInfo = async (
    accessToken: string,
  ): Promise<GoogleUserInfo> => {
    try {
      console.log("🌐 Obteniendo datos del usuario...");

      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Error HTTP ${response.status}: ${response.statusText}`,
        );
      }

      const data: GoogleUserInfo = await response.json();
      console.log("📊 Datos recibidos:", data);
      return data;
    } catch (error) {
      console.error("❌ Error en fetchUserInfo:", error);
      throw error;
    }
  };

  // Guardar datos del usuario en storage
  const saveUserData = async (userInfo: GoogleUserInfo) => {
    try {
      await secureStorage.setItem("google_user_data", JSON.stringify(userInfo));
      console.log("💾 Datos del usuario guardados en storage");
    } catch (error) {
      console.error("❌ Error guardando datos:", error);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      console.log("🚪 Cerrando sesión...");

      // Eliminar datos del usuario
      await secureStorage.deleteItem("google_user_data");

      // Limpiar estado
      setUser(null);

      console.log("✅ Sesión cerrada exitosamente");
    } catch (error) {
      console.error("❌ Error en logout:", error);
    }
  };

  // Manejar el inicio de login
  const handleLoginPress = async () => {
    console.log("=== INICIANDO LOGIN ===");
    console.log("Request config:", request);

    setLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.log("Error en promptAsync:", error);
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    initialLoading,
    handleLoginPress,
    handleLogout,
    request,
    response,
    redirectUri,
  };
};
