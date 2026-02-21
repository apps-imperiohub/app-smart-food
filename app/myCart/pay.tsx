import ReceiptInput from "@/components/myCartComponents/inputImage";
import RecipeHeader from "@/components/recipeOrder/recipeHeader";
import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Animated,
    Easing,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const PayScreen = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  const handleSubmit = () => {
    // Animación de éxito
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back(); // Redirigir después de la animación
    });

    setShowSuccess(true);
  };

  const closeModal = () => {
    setShowSuccess(false);
    router.back();
  };

  return (
    <View style={{ backgroundColor: COLORS.background, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <RecipeHeader title="Pay" handleGoBack={() => router.back()} />

        <ReceiptInput />
      </ScrollView>

      {/* Botón fijo */}
      <View style={style.fixedButtonContainer}>
        <TouchableOpacity style={style.submitButton} onPress={handleSubmit}>
          <Text style={style.submitButtonText}>Listo</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de éxito */}
      <Modal visible={showSuccess} transparent={true} animationType="fade">
        <View style={style.modalOverlay}>
          <Animated.View
            style={[style.successModal, { transform: [{ scale: scaleAnim }] }]}
          >
            {/* Icono de check animado */}
            <View style={style.successIcon}>
              <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <Circle cx="40" cy="40" r="38" fill="#34C759" />
                <Path
                  d="M55 35L37 53L25 41"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>

            <Text style={style.successTitle}>¡Éxito!</Text>
            <Text style={style.successMessage}>
              Tu comprobante ha sido enviado correctamente
            </Text>

            <TouchableOpacity style={style.modalButton} onPress={closeModal}>
              <Text style={style.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    right: "5%",
    backgroundColor: COLORS.white,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  submitButtonText: {
    ...favoritesStyles.title,
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "600",
  },
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successModal: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#34C759",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PayScreen;
