import { COLORS } from "@/constants/colors";
import { useRecipeDetail } from "@/hooks/useRecipeDetail";
import { favoritesStyles } from "@/styles/favorites.styles";
import type { RecipeCartProps } from "@/types/recipe";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const CartRecipe: React.FC<RecipeCartProps> = ({ id, onPriceChange }) => {
  const [mounted, setMounted] = useState(1);
  const { recipe, textoANumerico } = useRecipeDetail(id);
  useEffect(() => {
    if (recipe?.price && onPriceChange) {
      const itemPrice = textoANumerico(recipe.price) * mounted;
      onPriceChange(itemPrice);
    }
  }, [mounted, recipe?.price, onPriceChange, textoANumerico]);

  return (
    <View style={style.container}>
      <View style={{ width: "30%", height: "100%" }}>
        <Image
          source={{ uri: recipe?.image }}
          style={{ width: "100%", height: "100%", borderRadius: 50 }}
          resizeMode="cover"
        />
      </View>
      <View style={{ width: "65%", height: "100%" }}>
        <Text style={{ ...favoritesStyles.emptyTitle, marginBottom: 10 }}>
          {recipe?.title}
        </Text>
        <Text
          style={style.descriptionText}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {recipe?.description}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Text style={{ ...favoritesStyles.emptyTitle, marginBottom: 10 }}>
            $
            {recipe?.price &&
              (textoANumerico(recipe.price) * mounted).toFixed(2)}{" "}
            $
          </Text>
          <View style={style.add}>
            <TouchableOpacity
              onPress={() => setMounted(mounted + 1)}
              style={style.svg}
            >
              <Svg viewBox="0 0 24 24" width="100%" height="100%">
                <Path
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                  fill={COLORS.white}
                />
              </Svg>
            </TouchableOpacity>
            <Text>{mounted}</Text>
            <TouchableOpacity
              onPress={() => setMounted(mounted - 1)}
              style={{
                ...style.svg,
                backgroundColor:
                  mounted <= 0 ? COLORS.disabled : style.svg.backgroundColor,
              }}
              disabled={mounted <= 0}
            >
              <Svg viewBox="0 0 24 24" width="100%" height="100%">
                <Path
                  d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
                  fill={mounted <= 0 ? COLORS.text : COLORS.white}
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartRecipe;

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    height: 180,
  },
  descriptionText: {
    height: 50,
    fontSize: 15,
    lineHeight: 24,
    overflow: "hidden",
    color: "#555555",
    textAlign: "justify",
  },
  svg: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 29, // Mismo que el SVG
    height: 29, // Mismo que el SVG
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 39,
    width: 85,
    padding: 2,
    borderRadius: 20,
    // Sombra para efecto de elevación
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10, // Para Android
  },
});
