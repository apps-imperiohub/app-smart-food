import { COLORS } from "@/constants/colors";
import * as ImagePicker from "expo-image-picker"; // Si usas Expo
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
// o import * as DocumentPicker from 'expo-document-picker';

interface ReceiptInputProps {
  onFileSelected?: (fileUri: string) => void;
  label?: string;
}

const ReceiptInput: React.FC<ReceiptInputProps> = ({
  onFileSelected,
  label = "Comprobante de pago",
}) => {
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    try {
      setIsLoading(true);

      // Para Expo
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setReceiptImage(imageUri);
        onFileSelected?.(imageUri);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la imagen");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setReceiptImage(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="--- Banco ---"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.textInput}
        placeholder="--- Numero De Cuenta ---"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.textInput}
        placeholder="--- Nombre Del Beneficiario ---"
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={pickImage}
        disabled={isLoading}
      >
        {receiptImage ? (
          // Mostrar imagen seleccionada
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: receiptImage }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        ) : (
          // Mostrar área de carga
          <View style={styles.uploadArea}>
            {/* Icono SVG en el centro */}
            <View style={styles.iconContainer}>
              <Svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                <Circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="#007AFF"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <Path
                  d="M32 20V32H16V20H20V16H28V20H32ZM30 18H26V14H22V18H18V30H30V18Z"
                  fill="#007AFF"
                />
                <Path
                  d="M24 26C25.6569 26 27 24.6569 27 23C27 21.3431 25.6569 20 24 20C22.3431 20 21 21.3431 21 23C21 24.6569 22.3431 26 24 26Z"
                  fill="#007AFF"
                />
              </Svg>

              <Text style={styles.uploadText}>
                {isLoading ? "Cargando..." : "Toca para cargar comprobante"}
              </Text>
              <Text style={styles.uploadSubtext}>PNG, JPG o PDF hasta 5MB</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Input de texto alternativo (opcional) */}
      <TextInput
        style={styles.textInput}
        placeholder="--- O ingresa número de transacción ---"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    minHeight: 180,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 20,
  },
  uploadArea: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dottedLines: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-around",
    paddingVertical: 30,
  },
  dottedLine: {
    height: 1,
    backgroundColor: COLORS.disabled,
    width: "100%",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 12,
    textAlign: "center",
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  imagePreviewContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    marginTop: 15,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 15,
  },
});

export default ReceiptInput;
