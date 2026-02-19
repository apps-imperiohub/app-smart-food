import { UserProvider } from "@/context/UserContext";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../src/components/SafeScreen";

export default function RootLayout() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </SafeAreaProvider>
    </UserProvider>
  );
}
