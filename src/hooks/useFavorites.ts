import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { FavoritesAPI } from "../services/favoritesAPI";

export interface FavoriteRecipe {
  id: string;
  recipeId: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
}

export const useFavorites = (userId: string) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await FavoritesAPI.getFavorites(userId);

        // transform the data to match the RecipeCard component's expected format
        const transformedFavorites: FavoriteRecipe[] = favorites.map((favorite) => ({
          ...favorite,
          id: favorite.recipeId,
        }));

        setFavoriteRecipes(transformedFavorites);
      } catch (error) {
        console.log("Error loading favorites", error);
        Alert.alert("Error", "Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [userId]);

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => Alert.alert("Mock", "Logout deshabilitado en modo desarrollo")
      },
    ]);
  };

  return {
    favoriteRecipes,
    loading,
    handleSignOut,
  };
};
