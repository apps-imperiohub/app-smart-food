import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </SafeAreaProvider>
  );
}
