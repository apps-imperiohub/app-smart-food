import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import configureData from "./useAboutMe";

const ConfigurePanel = () => {
  const { socioHd, pedidos, beneficios, servicios } = configureData();
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.titleDiv}>Socio HD</Text>
        <View style={styles.cardContainer}>
          {socioHd.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.svgContainer}>{item.svg}</View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleDiv}>Pedidos</Text>
        <View style={styles.cardContainer}>
          {pedidos.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.svgContainer}>{item.svg}</View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleDiv}>Beneficios</Text>
        <View style={styles.cardContainer}>
          {beneficios.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.svgContainer}>{item.svg}</View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.titleDiv}>Servicios</Text>
        <View style={styles.cardContainer}>
          {servicios.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.svgContainer}>{item.svg}</View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Link style={styles.button} href="/orders/earring">
          <Text
            style={{
              ...favoritesStyles.title,
              fontSize: 16,
              textAlign: "center",
              textAlignVertical: "center",
              lineHeight: 40,
            }}
          >
            Pedidos Pendiente
          </Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    margin: 10,
    borderRadius: 10,
    height: 160,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
  },
  svgContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  item: {
    width: 80,
    height: 60,
    marginBottom: 30,
  },
  titleDiv: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 20,
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
export default ConfigurePanel;
