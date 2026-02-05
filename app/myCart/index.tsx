import CartRecipe from "@/components/myCartComponents/CartRecipe";
import RecipeHeader from "@/components/recipeOrder/recipeHeader";
import { COLORS, TRANSPARENT } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MyCartScreen = () => {
  const list = ["52886", "52895", "52854"];
  const [active, setActive] = useState(false);
  const [itemPrices, setItemPrices] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState(0);

  // Calcular total cuando cambien los precios individuales
  useEffect(() => {
    const newTotal = Object.values(itemPrices).reduce(
      (sum, price) => sum + price,
      0,
    );
    setTotal(newTotal);
  }, [itemPrices]);

  // Función para actualizar el precio de un item
  const handlePriceChange = (itemId: string, price: number) => {
    setItemPrices((prev) => ({
      ...prev,
      [itemId]: price,
    }));
  };
  return (
    <View style={{ backgroundColor: COLORS.background, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120, // ¡ESPACIO PARA EL BOTÓN FIJO!
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <RecipeHeader title="My Cart" />
        <View style={{ width: "100%" }}>
          {list.map((item, index) => (
            <CartRecipe
              key={index}
              id={item}
              onPriceChange={(price) => handlePriceChange(item, price)}
            />
          ))}
        </View>
        <View style={style.productCard}>
          <View>
            {!active ? (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: COLORS.button,
                }}
              >
                Ingresa aqui tu codigo de descuento
              </Text>
            ) : (
              <TextInput style={style.input} placeholder="---" />
            )}
          </View>
          <TouchableOpacity
            style={style.cartButton}
            onPress={() => setActive(!active)}
          >
            <Text
              style={{
                ...favoritesStyles.title,
                fontSize: 18, // Reducido un poco
                color: COLORS.white,
                fontWeight: "600",
              }}
            >
              Presiona
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...style.productCard,
            flexDirection: "column",
            borderRadius: 20,
          }}
        >
          <View style={style.mount}>
            <View>
              <Text
                style={{
                  color: COLORS.disabled,
                }}
              >
                Monto de la Orden:
              </Text>
            </View>
            <View>
              <Text style={{ color: COLORS.text, fontWeight: "700" }}>
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={style.mount}>
            <View>
              <Text
                style={{
                  color: COLORS.disabled,
                }}
              >
                Tax:
              </Text>
            </View>
            <View>
              <Text style={{ color: COLORS.text, fontWeight: "700" }}>
                $10.00
              </Text>
            </View>
          </View>
          <View
            style={{
              ...style.mount,
              borderTopWidth: 1,
              borderColor: TRANSPARENT,
            }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.disabled,
                }}
              >
                Total:
              </Text>
            </View>
            <View>
              <Text style={{ color: COLORS.text, fontWeight: "700" }}>
                ${(total + 10).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          ...style.productCard,
          position: "absolute",
          bottom: 20, // Distancia desde la parte inferior
          left: "5%", // Para centrar (100% - 90%) / 2 = 5%
          right: "5%",
          padding: 0,
        }}
      >
        <Link
          style={{ ...style.cartButton, width: "100%" }}
          href={"/myCart/pay"}
        >
          <Text
            style={{
              ...favoritesStyles.title,
              fontSize: 18, // Reducido un poco
              color: COLORS.white,
              fontWeight: "600",
            }}
          >
            Pay
          </Text>
        </Link>
      </View>
    </View>
  );
};
export default MyCartScreen;

const style = StyleSheet.create({
  productCard: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: "90%",
    paddingLeft: 20,
    marginHorizontal: "auto",
    paddingRight: 5,
    paddingVertical: 2,
    borderRadius: 50,
    // Sombra para efecto de elevación
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10, // Para Android
  },
  cartButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    padding: 12,
  },
  mount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
});
