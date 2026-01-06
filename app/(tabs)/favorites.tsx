import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { FavoritesAPI } from "../../src/services/favoritesAPI";
import { favoritesStyles } from "../../src/styles/favorites.styles";
import { COLORS } from "../../src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../../src/components/RecipeCard";
import NoFavoritesFound from "../../src/components/NoFavoritesFound";
import LoadingSpinner from "../../src/components/LoadingSpinner";

interface FavoriteRecipe {
  id: string;
  recipeId: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
}

const FavoritesScreen = () => {
  const user = { id: "mock-user-123" }; // Mock user para desarrollo
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await FavoritesAPI.getFavorites(user.id);

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
  }, [user.id]);

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => Alert.alert("Mock", "Logout deshabilitado en modo desarrollo") },
    ]);
  };

  if (loading) return <LoadingSpinner message="Loading your favorites..." />;

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
          <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default FavoritesScreen;
