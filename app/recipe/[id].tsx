import { View, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import { recipeDetailStyles } from "../../src/styles/recipe-detail.styles";
import { useRecipeDetail } from "../../src/hooks/useRecipeDetail";
import {
  RecipeHeader,
  RecipeTitleSection,
  RecipeStats,
  RecipeVideoTutorial,
  RecipeIngredients,
  RecipeInstructions,
  RecipeFavoriteButton,
} from "../../src/components/recipe-detail";

const RecipeDetailScreen = () => {
  const { id: recipeId } = useLocalSearchParams<{ id: string }>();

  const {
    recipe,
    loading,
    isSaved,
    isSaving,
    handleToggleSave,
    handleGoBack,
    getYouTubeEmbedUrl,
  } = useRecipeDetail(recipeId!);

  if (loading) return <LoadingSpinner message="Loading recipe details..." />;
  if (!recipe) return null;

  return (
    <View style={recipeDetailStyles.container}>
      <ScrollView>
        <RecipeHeader
          imageUri={recipe.image}
          onGoBack={handleGoBack}
          onToggleSave={handleToggleSave}
          isSaved={isSaved}
          isSaving={isSaving}
        />

        <RecipeTitleSection
          category={recipe.category}
          title={recipe.title}
          area={recipe.area}
        />

        <View style={recipeDetailStyles.contentSection}>
          <RecipeStats cookTime={recipe.cookTime} servings={recipe.servings} />

          {recipe.youtubeUrl && (
            <RecipeVideoTutorial
              youtubeUrl={recipe.youtubeUrl}
              getYouTubeEmbedUrl={getYouTubeEmbedUrl}
            />
          )}

          <RecipeIngredients ingredients={recipe.ingredients} />

          <RecipeInstructions instructions={recipe.instructions} />

          <RecipeFavoriteButton
            isSaved={isSaved}
            isSaving={isSaving}
            onToggleSave={handleToggleSave}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetailScreen;
