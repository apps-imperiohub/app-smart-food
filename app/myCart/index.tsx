import CartRecipe from "@/components/myCartComponents/CartRecipe";
import RecipeHeader from "@/components/recipeOrder/recipeHeader";
import { COLORS } from "@/constants/colors";
import { useUser } from "@/context/UserContext";
import { cartApi } from "@/services/api";
import { favoritesStyles } from "@/styles/favorites.styles";
import { Cart } from "@/types/cart";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MyCartScreen = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [active, setActive] = useState(false);
  const [itemPrices, setItemPrices] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState(0);
  const { user, loading, error } = useUser();
  const { getCart } = cartApi;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user?.id) {
          // ← Verificar que user existe
          const cartData = await getCart(user.id);
          console.log("🛒 Carrito del usuario:", cartData);
          setCart(cartData);
        }
      } catch (error) {
        console.error("❌ Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, [user?.id, getCart]); // ← Agregar dependencias
  // Calcular total de forma estable
  useEffect(() => {
    const prices = Object.values(itemPrices);
    if (prices.length === 0) {
      setTotal(0);
      return;
    }

    const newTotal = prices.reduce((sum, price) => sum + price, 0);
    setTotal(newTotal);
  }, [itemPrices]);

  // Función estable con useCallback
  const handlePriceChange = useCallback((itemId: string, price: number) => {
    setItemPrices((prev) => {
      // Solo actualizar si el precio cambió
      if (prev[itemId] === price) return prev;
      return {
        ...prev,
        [itemId]: price,
      };
    });
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  if (!user) return <Text>No hay usuario</Text>;
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RecipeHeader title="My Cart" />

        <View style={styles.itemsContainer}>
          {cart?.items ? (
            cart.items.map((item, index) => (
              <CartRecipe
                key={`${item}-${index}`}
                cantidad={item.cantidad}
                plato={item.plato} // Manejo de caso plato undefined
              />
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Tu carrito está vacío
            </Text>
          )}
        </View>

        {/* Sección de descuento */}
        <View style={styles.discountCard}>
          {!active ? (
            <Text style={styles.discountText}>
              Ingresa aquí tu código de descuento
            </Text>
          ) : (
            <TextInput
              style={styles.discountInput}
              placeholder="---"
              placeholderTextColor="#999"
            />
          )}
          <TouchableOpacity
            style={styles.discountButton}
            onPress={() => setActive(!active)}
          >
            <Text style={styles.discountButtonText}>
              {active ? "Cancelar" : "Aplicar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resumen de compra */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monto de la Orden:</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>$10.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${(total + 10).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón fijo de pago */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/myCart/pay")}
          style={styles.payButton}
        >
          <Text style={styles.payButtonText}>
            Pay ${(total + 10).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 120,
    flexGrow: 1,
  },
  itemsContainer: {
    width: "100%",
  },
  discountCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  discountText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.button,
    flex: 1,
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  discountButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
  discountButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 15,
    color: COLORS.disabled,
  },
  summaryValue: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "600",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    marginTop: 10,
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "700",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    right: "5%",
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  payButtonText: {
    ...favoritesStyles.title,
    fontSize: 18,
    color: COLORS.white,
    fontWeight: "600",
  },
});

export default MyCartScreen;
