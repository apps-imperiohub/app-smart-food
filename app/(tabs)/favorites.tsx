import { View, ScrollView } from "react-native";
import { favoritesStyles } from "../../src/styles/favorites.styles";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import FavoritesHeader from "../../src/components/FavoritesHeader";
import FavoritesRecipesList from "../../src/components/FavoritesRecipesList";
import { useFavorites } from "../../src/hooks/useFavorites";

const FavoritesScreen = () => {
  const user = { id: "mock-user-123" }; // Mock user para desarrollo
  const { favoriteRecipes, loading, handleSignOut } = useFavorites(user.id);

  if (loading) return <LoadingSpinner message="Loading your favorites..." />;

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FavoritesHeader onSignOut={handleSignOut} />
        <FavoritesRecipesList recipes={favoriteRecipes} />
      </ScrollView>
    </View>
  );
};
export default FavoritesScreen;
