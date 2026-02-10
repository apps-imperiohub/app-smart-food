import RecipeHeader from "@/components/recipeOrder/recipeHeader";
import RecipeIngredients from "@/components/recipeOrder/RecipeIngredients";
import RecipeOrder from "@/components/recipeOrder/recipeOrder";

import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useRecipeDetail } from "../../src/hooks/useRecipeDetail";

const RecipeDetailScreen = () => {
  const { id: recipeId } = useLocalSearchParams<{ id: string }>();
  const [mounted, setMounted] = useState<number>(1);
  const {
    textoANumerico,
    size,
    recipe,
    loading,
    handleGoBack,
    incrementIngredient,
    decrementIngredient,
    parseIngredient,
    ingredientQuantities,
    setIngredientQuantities,
  } = useRecipeDetail(recipeId!);

  if (loading) return <LoadingSpinner message="Loading recipe details..." />;
  if (!recipe) return null;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* ScrollView para el contenido desplazable */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }} // Espacio para la barra
        showsVerticalScrollIndicator={false}
      >
        <RecipeHeader
          handleGoBack={handleGoBack}
          source={recipe.image}
          title="My Cart"
        />
        <RecipeOrder
          title={recipe.title}
          mounted={mounted}
          setMounted={setMounted}
          description={recipe.description}
          star={recipe.stars}
          cookTime={recipe.cookTime}
          size={size}
          ingredients={recipe.ingredients}
        />
        <RecipeIngredients
          ingredients={recipe.ingredients}
          incrementIngredient={incrementIngredient}
          decrementIngredient={decrementIngredient}
          parseIngredient={parseIngredient}
          ingredientQuantities={ingredientQuantities}
          setIngredientQuantities={setIngredientQuantities}
        />
      </ScrollView>

      {/* Barra fija FUERA del ScrollView */}
      <View style={style.productCard}>
        <View style={style.priceContainer}>
          <Text style={{ ...favoritesStyles.title, fontSize: 20 }}>
            {typeof recipe.price === "string"
              ? textoANumerico(recipe.price) * mounted
              : recipe.price}
            $
          </Text>
        </View>
        <TouchableOpacity
          style={style.cartButton}
          onPress={() => router.push("/myCart")}
        >
          <Text
            style={{
              ...favoritesStyles.title,
              fontSize: 18, // Reducido un poco
              color: COLORS.white,
              fontWeight: "600",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeDetailScreen;

const style = StyleSheet.create({
  productCard: {
    position: "absolute",
    bottom: 20, // Distancia desde la parte inferior
    left: "5%", // Para centrar (100% - 90%) / 2 = 5%
    right: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 60,
    paddingLeft: 20,
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
  priceContainer: {},
  price: {},
  spacer: {},
  cartButton: {
    backgroundColor: COLORS.primary,
    height: 55,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {},
});
