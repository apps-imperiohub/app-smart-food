import { RefreshControl, ScrollView, View } from "react-native";
import AnimalIcons from "../../src/components/AnimalIcons";
import CategoryFilter from "../../src/components/CategoryFilter";
import FeaturedRecipe from "../../src/components/FeaturedRecipe";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import RecipesGrid from "../../src/components/RecipesGrid";
import { COLORS } from "../../src/constants/colors";
import { useHomeScreen } from "../../src/hooks/useHomeScreen";
import { homeStyles } from "../../src/styles/home.styles";

const HomeScreen = () => {
  const {
    selectedCategory,
    recipes,
    categories,
    featuredRecipe,
    loading,
    refreshing,
    handleCategorySelect,
    onRefresh,
    handleRecipePress,
  } = useHomeScreen();

  if (loading && !refreshing)
    return <LoadingSpinner message="Loading delicions recipes..." />;

  return (
    <View style={homeStyles.container}>
      {/* Scroll principal con pull-to-refresh */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={homeStyles.scrollContent}
      >
        {/* Barra de iconos de animales en la parte superior */}
        <AnimalIcons />

        {/* Card destacada de receta principal */}
        {featuredRecipe && (
          <FeaturedRecipe recipe={featuredRecipe} onPress={handleRecipePress} />
        )}

        {/* Filtro horizontal de categorías */}
        {categories.length > 0 && selectedCategory && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        {/* Grilla de recetas filtradas por categoría */}
        <RecipesGrid recipes={recipes} categoryName={selectedCategory} />
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
