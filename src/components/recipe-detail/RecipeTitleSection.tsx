import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { recipeDetailStyles } from "../../styles/recipe-detail.styles";
import { COLORS } from "../../constants/colors";

interface RecipeTitleSectionProps {
  category: string;
  title: string;
  area?: string;
}

export const RecipeTitleSection = ({ category, title, area }: RecipeTitleSectionProps) => {
  return (
    <View style={recipeDetailStyles.titleSection}>
      <View style={recipeDetailStyles.categoryBadge}>
        <Text style={recipeDetailStyles.categoryText}>{category}</Text>
      </View>
      <Text style={recipeDetailStyles.recipeTitle}>{title}</Text>
      {area && (
        <View style={recipeDetailStyles.locationRow}>
          <Ionicons name="location" size={16} color={COLORS.white} />
          <Text style={recipeDetailStyles.locationText}>{area} Cuisine</Text>
        </View>
      )}
    </View>
  );
};
