import { COLORS } from "@/constants/colors";
import { useRecipeDetail } from "@/hooks/useRecipeDetail";
import { favoritesStyles } from "@/styles/favorites.styles";
import type { RecipeCartProps } from "@/types/recipe";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface CartRecipeProps extends RecipeCartProps {
  onPriceChange?: (price: number) => void;
}

const CartRecipe: React.FC<CartRecipeProps> = ({ id, onPriceChange }) => {
  const [mounted, setMounted] = useState(1);
  const { recipe, textoANumerico } = useRecipeDetail(id);
  const lastPriceRef = useRef<number>(0); // ✅ CORRECTO - useRef

  // Manejar cambios en el precio
  const updatePrice = useCallback(() => {
    if (recipe?.price && onPriceChange) {
      const itemPrice = textoANumerico(recipe.price) * mounted;
      // Solo actualizar si el precio cambió significativamente
      if (Math.abs(itemPrice - lastPriceRef.current) > 0.01) {
        lastPriceRef.current = itemPrice; // Actualizar la referencia
        onPriceChange(itemPrice);
      }
    }
  }, [recipe?.price, mounted, textoANumerico, onPriceChange]);

  // Actualizar precio cuando cambia mounted
  useEffect(() => {
    updatePrice();
  }, [mounted, updatePrice]);

  // Actualizar precio cuando se carga la receta
  useEffect(() => {
    if (recipe?.price) {
      updatePrice();
    }
  }, [recipe?.price, updatePrice]);

  const handleIncrement = useCallback(() => {
    setMounted((prev) => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setMounted((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  if (!recipe) {
    return (
      <View style={[style.container, { opacity: 0.7 }]}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={style.image}
          resizeMode="cover"
        />
      </View>

      <View style={style.contentContainer}>
        <Text style={style.title}>{recipe.title}</Text>

        <Text style={style.description} numberOfLines={3} ellipsizeMode="tail">
          {recipe.description}
        </Text>

        <View style={style.priceRow}>
          <Text style={style.price}>
            ${(textoANumerico(recipe.price || "0") * mounted).toFixed(2)}
          </Text>

          <View style={style.quantityControls}>
            <TouchableOpacity
              onPress={handleDecrement}
              style={[
                style.quantityButton,
                mounted <= 0 && style.quantityButtonDisabled,
              ]}
              disabled={mounted <= 0}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24">
                <Path
                  d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
                  fill={mounted <= 0 ? COLORS.text : COLORS.white}
                />
              </Svg>
            </TouchableOpacity>

            <Text style={style.quantityText}>{mounted}</Text>

            <TouchableOpacity
              onPress={handleIncrement}
              style={style.quantityButton}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24">
                <Path
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  fill={COLORS.white}
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    margin: 10,
    padding: 12,
    flexDirection: "row",
    gap: 15,
    height: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "30%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  contentContainer: {
    width: "65%",
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    ...favoritesStyles.emptyTitle,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: COLORS.text,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: "#555555",
    flex: 1,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    ...favoritesStyles.emptyTitle,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: "center",
  },
});

export default CartRecipe;
