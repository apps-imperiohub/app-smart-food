import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { homeStyles } from "../../styles/home.styles";
import RecipeCard from "../RecipeCard";

interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  cookTime?: string;
  servings?: number;
  category?: string;
  area?: string;
}

interface RecipesGridProps {
  recipes: Recipe[];
  categoryName: string | null;
}

const RecipesGrid = ({ recipes, categoryName }: RecipesGridProps) => {
  return (
    <View style={homeStyles.recipesSection}>
      <View style={homeStyles.sectionHeader}>
        <Text style={homeStyles.sectionTitle}>{categoryName}</Text>
      </View>

      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={homeStyles.row}
          contentContainerStyle={homeStyles.recipesGrid}
          scrollEnabled={false}
        />
      ) : (
        <View style={homeStyles.emptyState}>
          <Ionicons
            name="restaurant-outline"
            size={64}
            color={COLORS.textLight}
          />
          <Text style={homeStyles.emptyTitle}>No recipes found</Text>
          <Text style={homeStyles.emptyDescription}>
            Try a different category
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecipesGrid;
