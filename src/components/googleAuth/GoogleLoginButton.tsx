import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Link, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useGoogleAuth } from "./useGoogleAuth";

if (Platform.OS !== "web") {
  WebBrowser.maybeCompleteAuthSession();
}
const GoogleLoginDebug = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!email) newErrors.email = "Email es requerido";
    if (!password) newErrors.password = "Contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log({ email, password });
    }
  };
  const {
    user,
    loading,
    initialLoading,
    handleLoginPress,
    handleLogout,
    request,
  } = useGoogleAuth();
  if (initialLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: COLORS.background }}>
      <View style={styles.imageContainer}>
        <Image source={require("../../img/login.jpg")} style={styles.image} />
        <Link
          style={styles.backButton}
          disabled={!request || loading}
          href={"/"}
        >
          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path
              d="M13 16L7 10L13 4"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Link>
      </View>
      {user ? (
        // Vista cuando el usuario está logueado
        <View style={styles.loggedInContainer}>
          <View style={styles.userInfoCard}>
            {user.picture && (
              <Image
                source={{ uri: user.picture }}
                style={styles.profileImage}
              />
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userStatus}>✅ Sesión activa con Google</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
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
        <View>
          <View style={styles.container}>
            <View
              style={{
                display: "flex",
                marginBottom: 15,
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Text style={{ ...favoritesStyles.emptyTitle, fontSize: 18 }}>
                Email:
              </Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Inserta el Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <View
              style={{
                display: "flex",
                marginBottom: 15,
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Text style={{ ...favoritesStyles.emptyTitle, fontSize: 18 }}>
                Contraseña:
              </Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Inserta el Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <Link href={"/"} style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Link>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={{ ...styles.line, marginLeft: 5 }} />
            <Text style={styles.title}>Conectate con</Text>
            <View style={{ ...styles.line, marginRight: 5 }} />
          </View>
          <TouchableOpacity
            style={{ ...styles.button, marginHorizontal: 20 }}
            onPress={handleLoginPress}
            disabled={!request || loading}
          >
            <Image
              source={require("../../img/google.png")}
              style={{ width: 50, height: 50 }}
            ></Image>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    display: "flex",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    display: "flex",
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
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.button,
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.button,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPasswordText: {
    color: COLORS.textLight,
    fontSize: 14,
    marginTop: 5,
    textAlign: "right",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.button,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginHorizontal: 12,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  // Cuando está logueado
  loggedInContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    textAlign: "center",
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
    marginHorizontal: 20,
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
    textAlign: "center",
    marginBottom: 4,
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

  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.button,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.button,
    marginHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
  },
  secondaryButtonText: {
    color: COLORS.button,
    fontSize: 16,
    fontWeight: "600",
  },
  actionsContainer: {
    gap: 12,
  },
});

export default GoogleLoginDebug;
