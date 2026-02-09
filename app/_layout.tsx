import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../src/components/SafeScreen";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
