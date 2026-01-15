import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { homeStyles } from "../../styles/home.styles";
import { Recipe } from "../../types/recipe";

interface FeaturedRecipeProps {
  recipe: Recipe;
  onPress: (recipeId: string) => void;
}

const FeaturedRecipe = ({ recipe, onPress }: FeaturedRecipeProps) => {
  return (
    <View style={homeStyles.featuredSection}>
      <TouchableOpacity
        style={homeStyles.featuredCard}
        activeOpacity={0.9}
        onPress={() => onPress(recipe.id)}
      >
        <View style={homeStyles.featuredImageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={homeStyles.featuredImage}
            contentFit="cover"
            transition={500}
          />
          <View style={homeStyles.featuredOverlay}>
            <View style={homeStyles.featuredBadge}>
              <Text style={homeStyles.featuredBadgeText}>Featured</Text>
            </View>

            <View style={homeStyles.featuredContent}>
              <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                {recipe.title}
              </Text>

              <View style={homeStyles.featuredMeta}>
                <View style={homeStyles.metaItem}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={COLORS.white}
                  />
                  <Text style={homeStyles.metaText}>{recipe.cookTime}</Text>
                </View>
                <View style={homeStyles.metaItem}>
                  <Ionicons
                    name="people-outline"
                    size={16}
                    color={COLORS.white}
                  />
                  <Text style={homeStyles.metaText}>{recipe.servings}</Text>
                </View>
                {recipe.area && (
                  <View style={homeStyles.metaItem}>
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color={COLORS.white}
                    />
                    <Text style={homeStyles.metaText}>{recipe.area}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeaturedRecipe;
