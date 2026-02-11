import { COLORS } from "@/constants/colors";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

// Solo llamar en móvil
if (Platform.OS !== "web") {
  WebBrowser.maybeCompleteAuthSession();
}

const GoogleLoginDebug = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header con imagen */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../img/login.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Svg width="24" height="24" viewBox="0 0 46 46" fill="none">
            <Path
              d="M28 33L17 23L28 13"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* Overlay para el título */}
        <View style={styles.imageOverlay}>
          <Text style={styles.welcomeTitle}>Bienvenido</Text>
          <Text style={styles.welcomeSubtitle}>
            {user ? `Hola, ${user}` : "Inicia sesión para continuar"}
          </Text>
        </View>
      </View>

      {/* Contenido principal */}
      <View style={styles.contentContainer}>
        {user ? (
          // Vista cuando el usuario está logueado
          <View style={styles.loggedInContainer}>
            <View style={styles.userInfoCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user}</Text>
                <Text style={styles.userEmail}>{user}</Text>
                <Text style={styles.userStatus}>
                  ✅ Sesión activa con Google
                </Text>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity style={[styles.button, styles.logoutButton]}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => router.push("/")}
              >
                <Text style={styles.secondaryButtonText}>Ir al perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Vista de login (email/password + Google)
          <>
            {/* Formulario de login tradicional */}
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Iniciar sesión</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="tu@email.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="••••••••"
                  value={password}
                  secureTextEntry
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Link href="/" style={styles.forgotPasswordLink}>
                  <Text style={styles.forgotPasswordText}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </Link>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>

            {/* Separador */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>o continúa con</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Botón de Google */}
            <View style={styles.googleContainer}>
              <TouchableOpacity
                style={[
                  styles.googleButton,
                  loading && styles.googleButtonDisabled,
                ]}
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#666" />
                ) : (
                  <>
                    <Image
                      source={require("../../img/google.png")}
                      style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>
                      Continuar con Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Enlace a registro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <Link href="/" style={styles.registerLink}>
                <Text style={styles.registerLinkText}>Regístrate aquí</Text>
              </Link>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textLight,
  },

  // Header con imagen
  imageContainer: {
    position: "relative",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 40,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },

  // Contenido principal
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },

  // Cuando está logueado
  loggedInContainer: {
    flex: 1,
    justifyContent: "center",
  },
  userInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.button,
    marginBottom: 16,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  userStatus: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  actionsContainer: {
    gap: 12,
  },

  // Formulario
  formContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: COLORS.text,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 6,
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    color: COLORS.button,
    fontSize: 14,
    fontWeight: "500",
  },

  // Botones
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: COLORS.button,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.button,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: COLORS.button,
    fontSize: 16,
    fontWeight: "600",
  },

  // Separador
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  separatorText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginHorizontal: 12,
    fontWeight: "500",
  },

  // Google Button
  googleContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  configuringText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 8,
    fontStyle: "italic",
  },

  // Registro
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  registerText: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  registerLink: {
    marginLeft: 4,
  },
  registerLinkText: {
    fontSize: 15,
    color: COLORS.button,
    fontWeight: "600",
  },
});

export default GoogleLoginDebug;
