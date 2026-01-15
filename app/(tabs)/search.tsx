import { View } from "react-native";
import { searchStyles } from "../../src/styles/search.styles";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useRecipeSearch } from "../../src/hooks/useRecipeSearch";
import { SearchBar } from "../../src/components/SearchBar";
import { SearchResults } from "../../src/components/SearchResults";

const SearchScreen = () => {
  const { searchQuery, setSearchQuery, recipes, loading, initialLoading, clearSearch } =
    useRecipeSearch();

  if (initialLoading) return <LoadingSpinner message="Loading recipes..." />;

  return (
    <View style={searchStyles.container}>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} onClear={clearSearch} />
      <SearchResults searchQuery={searchQuery} recipes={recipes} loading={loading} />
    </View>
  );
};

export default SearchScreen;
