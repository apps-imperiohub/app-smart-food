import { FlatList, Text, View } from "react-native";
import { Recipe } from "../../hooks/useRecipeSearch";
import { searchStyles } from "../../styles/search.styles";
import LoadingSpinner from "../LoadingSpinner";
import { NoResultsFound } from "../NoResultsFound";
import RecipeCard from "../RecipeCard";

interface SearchResultsProps {
  searchQuery: string;
  recipes: Recipe[];
  loading: boolean;
}

export const SearchResults = ({
  searchQuery,
  recipes,
  loading,
}: SearchResultsProps) => {
  return (
    <View style={searchStyles.resultsSection}>
      <View style={searchStyles.resultsHeader}>
        <Text style={searchStyles.resultsTitle}>
          {searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}
        </Text>
        <Text style={searchStyles.resultsCount}>{recipes.length} found</Text>
      </View>

      {loading ? (
        <View style={searchStyles.loadingContainer}>
          <LoadingSpinner message="Searching recipes..." size="small" />
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={searchStyles.row}
          contentContainerStyle={searchStyles.recipesGrid}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoResultsFound />}
        />
      )}
    </View>
  );
};
