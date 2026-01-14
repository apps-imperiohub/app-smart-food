import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { MealAPI, TransformedRecipe } from "../services/mealAPI";
import { Recipe, Category } from "../types/recipe";

export const useHomeScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [apiCategories, randomMeals, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories: Category[] = apiCategories.map(
        (cat: any, index: number) => ({
          id: index + 1,
          name: cat.strCategory,
          image: cat.strCategoryThumb,
          description: cat.strCategoryDescription,
        })
      );

      setCategories(transformedCategories);

      if (!selectedCategory) setSelectedCategory(transformedCategories[0].name);

      const transformedMeals = randomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal): meal is TransformedRecipe => meal !== null);

      setRecipes(transformedMeals);

      const transformedFeatured = MealAPI.transformMealData(featuredMeal);
      if (transformedFeatured) {
        setFeaturedRecipe(transformedFeatured);
      }
    } catch (error) {
      console.log("Error loading the data", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category: string) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal): meal is TransformedRecipe => meal !== null);
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data:", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    selectedCategory,
    recipes,
    categories,
    featuredRecipe,
    loading,
    refreshing,
    handleCategorySelect,
    onRefresh,
    handleRecipePress,
  };
};
