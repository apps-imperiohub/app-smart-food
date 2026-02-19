import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  // userId constante con useMemo
  const userId = useMemo(() => "mock-user-123", []);

  // useEffect principal - carga los datos
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!isMounted) return;

      try {
        setLoading(true);

        // 1. Cargar detalles de la receta
        const mealData = await MealAPI.getMealById(recipeId);

        if (isMounted && mealData) {
          const transformedRecipe = MealAPI.transformMealData(mealData);

          if (transformedRecipe) {
            const recipeWithVideo: Recipe = {
              ...transformedRecipe,
              youtubeUrl: mealData.strYoutube || null,
            };
            setRecipe(recipeWithVideo);
          }
        }

        // 2. Verificar si está guardado (solo si tenemos receta)
        if (isMounted) {
          try {
            const isRecipeSaved = await FavoritesAPI.isFavorited(
              userId,
              recipeId,
            );
            setIsSaved(isRecipeSaved);
          } catch (error) {
            console.error("Error checking if recipe is saved:", error);
          }
        }
      } catch (error) {
        console.error("Error loading recipe detail:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [recipeId, userId]); // userId es estable gracias a useMemo

  // Funciones con useCallback para evitar recreaciones
  const getYouTubeEmbedUrl = useCallback((url: string) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }, []);

  const handleToggleSave = useCallback(async () => {
    if (!recipe || isSaving) return;

    setIsSaving(true);

    try {
      if (isSaved) {
        await FavoritesAPI.removeFavorite(userId, recipeId);
        setIsSaved(false);
      } else {
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
  }, [recipe, isSaved, isSaving, userId, recipeId]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const textoANumerico = useCallback((texto: string): number => {
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
  }, []);

  const incrementIngredient = useCallback((index: number) => {
    setIngredientQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  }, []);

  const decrementIngredient = useCallback((index: number) => {
    setIngredientQuantities((prev) => {
      const current = prev[index] || 0;
      if (current <= 0) return prev;
      return {
        ...prev,
        [index]: current - 1,
      };
    });
  }, []);

  const parseIngredient = useCallback((ingredient: string) => {
    const parts = ingredient.split(" ");
    if (parts.length >= 2 && /^\d+/.test(parts[0])) {
      return {
        original: ingredient,
        quantity: parts.slice(0, 2).join(" "),
        name: parts.slice(2).join(" "),
      };
    }
    return { original: ingredient, quantity: "", name: ingredient };
  }, []);

  // Resetear cantidades cuando cambia la receta
  useEffect(() => {
    setIngredientQuantities({});
  }, [recipeId]);

  const size = useMemo(
    () => [
      { text: "XS", Value: 1 },
      { text: "SM", Value: 2 },
      { text: "L", Value: 3 },
      { text: "XL", Value: 4 },
      { text: "XXL", Value: 5 },
    ],
    [],
  );

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

