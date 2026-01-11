import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { MealAPI } from "../services/mealAPI";
import { FavoritesAPI } from "../services/favoritesAPI";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  category: string;
  area: string;
  ingredients: string[];
  instructions: string[];
  youtubeUrl?: string | null;
}

export const useRecipeDetail = (recipeId: string) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
          cookTime: recipe.cookTime,
          servings: recipe.servings,
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

  return {
    recipe,
    loading,
    isSaved,
    isSaving,
    handleToggleSave,
    handleGoBack,
    getYouTubeEmbedUrl,
  };
};

export type { Recipe };
