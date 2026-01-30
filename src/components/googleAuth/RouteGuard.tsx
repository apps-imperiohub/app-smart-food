// components/RouteGuard.tsx
import { secureStorage } from "@/utils/storage";
import { router } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface RouteGuardProps {
  children: ReactNode;
  redirectTo: string;
  fallback?: ReactNode;
}

export const RouteGuard = ({
  children,
  redirectTo = "loging",
  fallback,
}: RouteGuardProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsChecking(true);

        // Verificar si hay algún usuario en storage
        const googleUser = await secureStorage.getItem("google_user_data");
        const appUser = await secureStorage.getItem("app_user");

        const hasUser = !!googleUser || !!appUser;
        setIsAuthenticated(hasUser);

        if (!hasUser) {
          console.log("🔒 Usuario no autenticado, redirigiendo...");
          router.replace(`/loging`);
        }
      } catch (error) {
        console.error("Error verificando auth:", error);
        router.replace(`/loging`);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, []);

  if (isChecking) {
    return (
      fallback || (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      )
    );
  }

  if (!isAuthenticated) {
    return null; // Ya fue redirigido
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
