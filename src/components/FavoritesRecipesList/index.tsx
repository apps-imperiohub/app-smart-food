import { View, FlatList } from "react-native";
import RecipeCard from "../RecipeCard";
import NoFavoritesFound from "../NoFavoritesFound";
import { favoritesStyles } from "../../styles/favorites.styles";
import { FavoriteRecipe } from "../../hooks/useFavorites";

interface FavoritesRecipesListProps {
  recipes: FavoriteRecipe[];
}

const FavoritesRecipesList = ({ recipes }: FavoritesRecipesListProps) => {
  return (
    <View style={favoritesStyles.recipesSection}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={favoritesStyles.row}
        contentContainerStyle={favoritesStyles.recipesGrid}
        scrollEnabled={false}
        ListEmptyComponent={<NoFavoritesFound />}
      />
    </View>
  );
};

export default FavoritesRecipesList;
