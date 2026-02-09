import type { User } from "@react-native-google-signin/google-signin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Button, StyleSheet, Text, View } from "react-native";

interface GoogleAuthScreenProps {
  userInfo: User | null;
  isSigningIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const GoogleAuthScreen = ({
  userInfo,
  isSigningIn,
  onSignIn,
  onSignOut,
}: GoogleAuthScreenProps) => {
  return (
    <View style={styles.container}>
      {!userInfo ? (
        <View style={styles.signInContainer}>
          <Text style={styles.title}>Google Sign-In</Text>

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onSignIn}
            disabled={isSigningIn}
          />

          <Text style={styles.helpText}>
            Inicia sesión con Google para continuar
          </Text>
        </View>
      ) : (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            ✅ Usuario autenticado correctamente
          </Text>

          <Button title="Cerrar sesión" onPress={onSignOut} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  signInContainer: {
    alignItems: "center",
    gap: 20,
  },
  helpText: {
    textAlign: "center",
    opacity: 0.6,
  },
  successContainer: {
    alignItems: "center",
    gap: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
