import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { recipeDetailStyles } from "../../styles/recipe-detail.styles";
import { COLORS, GRADIENTS } from "../../constants/colors";

interface RecipeStatsProps {
  cookTime: string;
  servings: number;
}

export const RecipeStats = ({ cookTime, servings }: RecipeStatsProps) => {
  return (
    <View style={recipeDetailStyles.statsContainer}>
      <View style={recipeDetailStyles.statCard}>
        <LinearGradient
          colors={GRADIENTS.prepTime}
          style={recipeDetailStyles.statIconContainer}
        >
          <Ionicons name="time" size={20} color={COLORS.white} />
        </LinearGradient>
        <Text style={recipeDetailStyles.statValue}>{cookTime}</Text>
        <Text style={recipeDetailStyles.statLabel}>Prep Time</Text>
      </View>

      <View style={recipeDetailStyles.statCard}>
        <LinearGradient
          colors={GRADIENTS.servings}
          style={recipeDetailStyles.statIconContainer}
        >
          <Ionicons name="people" size={20} color={COLORS.white} />
        </LinearGradient>
        <Text style={recipeDetailStyles.statValue}>{servings}</Text>
        <Text style={recipeDetailStyles.statLabel}>Servings</Text>
      </View>
    </View>
  );
};
