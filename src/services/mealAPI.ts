// Mock data imports
import categoriesData from "../data/categories.json";
import recipesData from "../data/recipes.json";
import { Recipe } from "../types/recipe";

// const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

interface MealData {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  [key: string]: any;
}

export interface TransformedRecipe extends Recipe {
  originalData: MealData;
}

// Utility to get random items from array
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const MealAPI = {
  // search meal by name
  searchMealsByName: async (query: string): Promise<MealData[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const lowercaseQuery = query.toLowerCase();
      const results = recipesData.filter((meal) =>
        meal.strMeal.toLowerCase().includes(lowercaseQuery)
      );
      return results;
    } catch (error) {
      console.error("Error searching meals by name:", error);
      return [];
    }
  },

  // lookup full meal details by id
  getMealById: async (id: string): Promise<MealData | null> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const meal = recipesData.find((meal) => meal.idMeal === id);
      return meal || null;
    } catch (error) {
      console.error("Error getting meal by id:", error);
      return null;
    }
  },

  // lookup a single random meal
  getRandomMeal: async (): Promise<MealData | null> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const randomIndex = Math.floor(Math.random() * recipesData.length);
      return recipesData[randomIndex];
    } catch (error) {
      console.error("Error getting random meal:", error);
      return null;
    }
  },

  // get multiple random meals
  getRandomMeals: async (count: number = 6): Promise<MealData[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      return getRandomItems(recipesData, Math.min(count, recipesData.length));
    } catch (error) {
      console.error("Error getting random meals:", error);
      return [];
    }
  },

  // list all meal categories
  getCategories: async (): Promise<any[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      return categoriesData;
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  },

  // filter by main ingredient
  filterByIngredient: async (ingredient: string): Promise<MealData[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const lowercaseIngredient = ingredient.toLowerCase();
      const results = recipesData.filter((meal) => {
        for (let i = 1; i <= 20; i++) {
          const mealIngredient = meal[`strIngredient${i}`];
          if (
            mealIngredient &&
            mealIngredient.toLowerCase().includes(lowercaseIngredient)
          ) {
            return true;
          }
        }
        return false;
      });
      return results;
    } catch (error) {
      console.error("Error filtering by ingredient:", error);
      return [];
    }
  },

  // filter by category
  filterByCategory: async (category: string): Promise<MealData[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const results = recipesData.filter(
        (meal) => meal.strCategory.toLowerCase() === category.toLowerCase()
      );
      return results;
    } catch (error) {
      console.error("Error filtering by category:", error);
      return [];
    }
  },

  // transform TheMealDB meal data to our app format
  transformMealData: (meal: MealData | null): TransformedRecipe | null => {
    if (!meal) return null;

    // extract ingredients from the meal object
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        const measureText = measure && measure.trim() ? `${measure.trim()} ` : "";
        ingredients.push(`${measureText}${ingredient.trim()}`);
      }
    }

    // extract instructions
    const instructions = meal.strInstructions
      ? meal.strInstructions.split(/\r?\n/).filter((step) => step.trim())
      : [];

    // generate mock price, stars and sales based on meal id
    const idNum = parseInt(meal.idMeal);
    const price = (8 + (idNum % 20)).toFixed(2);
    const stars = (3.5 + (idNum % 15) / 10).toFixed(1);
    const sales = (50 + (idNum % 450)).toString();

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions
        ? meal.strInstructions.substring(0, 120) + "..."
        : "Delicious meal from TheMealDB",
      image: meal.strMealThumb,
      cookTime: "30 minutes",
      servings: 4,
      category: meal.strCategory || "Main Course",
      area: meal.strArea,
      ingredients,
      instructions,
      youtubeUrl: meal.strYoutube || null,
      price,
      stars,
      sales,
      originalData: meal,
    };
  },
};
