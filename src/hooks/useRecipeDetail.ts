import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { FavoritesAPI } from "../services/favoritesAPI";
import { MealAPI } from "../services/mealAPI";
import { Recipe } from "../types/recipe";

export const useRecipeDetail = (recipeId: string) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [ingredientQuantities, setIngredientQuantities] = useState<{
    [key: number]: number;
  }>({});

  const userId = "mock-user-123"; // Mock user para desarrollo

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const isRecipeSaved = await FavoritesAPI.isFavorited(userId, recipeId);
        setIsSaved(isRecipeSaved);
      } catch (error) {
        console.error("Error checking if recipe is saved:", error);
      }
    };

    const loadRecipeDetail = async () => {
      setLoading(true);
      try {
        const mealData = await MealAPI.getMealById(recipeId);
        if (mealData) {
          const transformedRecipe = MealAPI.transformMealData(mealData);

          if (transformedRecipe) {
            const recipeWithVideo: Recipe = {
              ...transformedRecipe,
              youtubeUrl: mealData.strYoutube || null,
            };

            setRecipe(recipeWithVideo);
          }
        }
      } catch (error) {
        console.error("Error loading recipe detail:", error);
      } finally {
        setLoading(false);
      }
    };

    checkIfSaved();
    loadRecipeDetail();
  }, [recipeId, userId]);

  const getYouTubeEmbedUrl = (url: string) => {
    // example url: https://www.youtube.com/watch?v=mTvlmY4vCug
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleToggleSave = async () => {
    if (!recipe) return;

    setIsSaving(true);

    try {
      if (isSaved) {
        // remove from favorites
        await FavoritesAPI.removeFavorite(userId, recipeId);
        setIsSaved(false);
      } else {
        // add to favorites
        await FavoritesAPI.addFavorite({
          userId,
          recipeId: recipeId,
          title: recipe.title,
          image: recipe.image,
          cookTime: recipe.cookTime || "30 minutes",
          servings: recipe.servings || 4,
        });
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error toggling recipe save:", error);
      Alert.alert("Error", `Something went wrong. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const size = [
    {
      text: "XS",
      Value: 1,
    },
    {
      text: "SM",
      Value: 2,
    },
    {
      text: "L",
      Value: 3,
    },
    {
      text: "XL",
      Value: 4,
    },
    {
      text: "XXL",
      Value: 5,
    },
  ];
  function textoANumerico(texto: string): number {
    const limpio = texto.replace(/[^\d.,]/g, "");

    let resultado = limpio;

    const puntoIndex = resultado.indexOf(".");

    if (puntoIndex !== -1 && puntoIndex < resultado.length - 1) {
      const antesPunto = resultado.substring(0, puntoIndex).replace(/\./g, "");
      const despuesPunto = resultado.substring(puntoIndex + 1);
      resultado = antesPunto + "." + despuesPunto;
    } else {
      resultado = resultado.replace(/\./g, "");
    }
    resultado = resultado.replace(/,/g, "");

    const numero = parseFloat(resultado);
    return isNaN(numero) ? 0 : numero;
  }
  const incrementIngredient = (index: number) => {
    setIngredientQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  // Función para decrementar un ingrediente
  const decrementIngredient = (index: number) => {
    setIngredientQuantities((prev) => {
      const current = prev[index] || 0;
      if (current <= 0) return prev;
      return {
        ...prev,
        [index]: current - 1,
      };
    });
  };

  // Función para extraer cantidad y nombre del ingrediente
  const parseIngredient = (ingredient: string) => {
    // Ejemplo: "1 package Rice Noodles" → {quantity: "1 package", name: "Rice Noodles"}
    const parts = ingredient.split(" ");
    if (parts.length >= 2 && /^\d+/.test(parts[0])) {
      // Si el primer elemento es un número
      return {
        original: ingredient,
        quantity: parts.slice(0, 2).join(" "), // Toma cantidad + unidad
        name: parts.slice(2).join(" "),
      };
    }
    return { original: ingredient, quantity: "", name: ingredient };
  };
  return {
    textoANumerico,
    size,
    recipe,
    loading,
    isSaved,
    isSaving,
    handleToggleSave,
    handleGoBack,
    getYouTubeEmbedUrl,
    incrementIngredient,
    decrementIngredient,
    parseIngredient,
    ingredientQuantities,
    setIngredientQuantities,
  };
};

export type { Recipe };

