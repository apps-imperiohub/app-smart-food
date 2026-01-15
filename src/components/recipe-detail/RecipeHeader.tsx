import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { recipeDetailStyles } from "../../styles/recipe-detail.styles";
import { COLORS, TRANSPARENCY, TRANSPARENT } from "../../constants/colors";

interface RecipeHeaderProps {
  imageUri: string;
  onGoBack: () => void;
  onToggleSave: () => void;
  isSaved: boolean;
  isSaving: boolean;
}

export const RecipeHeader = ({
  imageUri,
  onGoBack,
  onToggleSave,
  isSaved,
  isSaving,
}: RecipeHeaderProps) => {
  return (
    <View style={recipeDetailStyles.headerContainer}>
      <View style={recipeDetailStyles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={recipeDetailStyles.headerImage}
          contentFit="cover"
        />
      </View>

      <LinearGradient
        colors={[TRANSPARENT, TRANSPARENCY.blackMedium, TRANSPARENCY.blackAlmostOpaque]}
        style={recipeDetailStyles.gradientOverlay}
      />

      <View style={recipeDetailStyles.floatingButtons}>
        <TouchableOpacity
          style={recipeDetailStyles.floatingButton}
          onPress={onGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            recipeDetailStyles.floatingButton,
            { backgroundColor: isSaving ? COLORS.disabled : COLORS.primary },
          ]}
          onPress={onToggleSave}
          disabled={isSaving}
        >
          <Ionicons
            name={isSaving ? "hourglass" : isSaved ? "bookmark" : "bookmark-outline"}
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
