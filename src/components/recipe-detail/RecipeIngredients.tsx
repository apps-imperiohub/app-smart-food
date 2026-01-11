import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { recipeDetailStyles } from "../../styles/recipe-detail.styles";
import { COLORS } from "../../constants/colors";

interface RecipeIngredientsProps {
  ingredients: string[];
}

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <View style={recipeDetailStyles.sectionContainer}>
      <View style={recipeDetailStyles.sectionTitleRow}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary + "80"]}
          style={recipeDetailStyles.sectionIcon}
        >
          <Ionicons name="list" size={16} color={COLORS.white} />
        </LinearGradient>
        <Text style={recipeDetailStyles.sectionTitle}>Ingredients</Text>
        <View style={recipeDetailStyles.countBadge}>
          <Text style={recipeDetailStyles.countText}>{ingredients.length}</Text>
        </View>
      </View>

      <View style={recipeDetailStyles.ingredientsGrid}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={recipeDetailStyles.ingredientCard}>
            <View style={recipeDetailStyles.ingredientNumber}>
              <Text style={recipeDetailStyles.ingredientNumberText}>{index + 1}</Text>
            </View>
            <Text style={recipeDetailStyles.ingredientText}>{ingredient}</Text>
            <View style={recipeDetailStyles.ingredientCheck}>
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.textLight} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
