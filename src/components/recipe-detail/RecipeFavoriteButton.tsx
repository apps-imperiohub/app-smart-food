import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { recipeDetailStyles } from "../../styles/recipe-detail.styles";
import { COLORS } from "../../constants/colors";

interface RecipeFavoriteButtonProps {
  isSaved: boolean;
  isSaving: boolean;
  onToggleSave: () => void;
}

export const RecipeFavoriteButton = ({
  isSaved,
  isSaving,
  onToggleSave,
}: RecipeFavoriteButtonProps) => {
  return (
    <TouchableOpacity
      style={recipeDetailStyles.primaryButton}
      onPress={onToggleSave}
      disabled={isSaving}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary + "CC"]}
        style={recipeDetailStyles.buttonGradient}
      >
        <Ionicons name="heart" size={20} color={COLORS.white} />
        <Text style={recipeDetailStyles.buttonText}>
          {isSaved ? "Remove from Favorites" : "Add to Favorites"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
