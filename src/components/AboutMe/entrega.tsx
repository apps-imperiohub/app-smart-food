import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import configureData from "./useAboutMe";

const Entrega = () => {
  const { entregaData } = configureData();
  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Flecha izquierda - SVG corregido */}
          <Svg viewBox="0 0 24 24" width="24" height="24">
            <Path
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
              fill="#000000"
            />
          </Svg>

          {/* Icono de menú/listas - SVG corregido */}
          <Svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style={{ marginLeft: 15 }}
          >
            <Path
              d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"
              fill="#000000"
            />
          </Svg>
        </View>

        <View>
          <Text style={{ ...favoritesStyles.title, fontSize: 22 }}>
            Editar la Dirección
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Icono de búsqueda - SVG corregido */}
          <Svg viewBox="0 0 24 24" width="24" height="24">
            <Path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              fill="#000000"
            />
          </Svg>

          {/* Icono de carrito - SVG corregido */}
          <Svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style={{ marginLeft: 15 }}
          >
            <Path
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
              fill="#000000"
            />
          </Svg>
        </View>
      </View>

      <View>
        {entregaData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View>
              <Text
                style={{
                  ...favoritesStyles.title,
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                {item.nombre}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.textLight,
                  marginBottom: 10,
                }}
              >
                {item.direccion}
              </Text>
              <Text
                style={{
                  ...favoritesStyles.title,
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                {item.ciudad}, {item.estado}, {item.codigoPostal}
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.textLight }}>
                {item.pais}
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.textLight }}>
                {item.codigo} {item.numero}
              </Text>
            </View>
            <View>
              <Svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ marginLeft: 15 }}
              >
                <Path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                  fill="#000000"
                />
              </Svg>
            </View>
          </View>
        ))}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Link style={styles.button} href="/orders/configuration">
            <Text
              style={{
                ...favoritesStyles.title,
                fontSize: 16,
                textAlign: "center",
                textAlignVertical: "center",
                lineHeight: 40,
              }}
            >
              + Nueva Dirección
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
    padding: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    width: "100%",
    // Para que el texto esté más arriba:
    textAlignVertical: "top", // Android
    paddingTop: 10, // Reduce padding superior
    paddingBottom: 10, // Mantén padding inferior
    height: 48, // Altura fija opcional
    includeFontPadding: false, // Elimina padding extra de la fuente (Android)
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: COLORS.button,
    width: 300,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
export default Entrega;
