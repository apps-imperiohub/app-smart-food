// Mock favorites storage (in-memory)
interface Favorite {
  id: number;
  userId: string;
  recipeId: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
}

interface FavoriteData {
  userId: string;
  recipeId: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
}

let mockFavorites: Favorite[] = [];

// Simulate API delay
const delay = (ms: number = 300): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const FavoritesAPI = {
  // Get all favorites for a user
  getFavorites: async (userId: string): Promise<Favorite[]> => {
    try {
      await delay();
      return mockFavorites.filter((fav) => fav.userId === userId);
    } catch (error) {
      console.error("Error getting favorites:", error);
      throw error;
    }
  },

  // Add a favorite
  addFavorite: async (favoriteData: FavoriteData): Promise<{ success: boolean; favorite: Favorite }> => {
    try {
      await delay();
      const newFavorite: Favorite = {
        id: Date.now(), // Simple ID generation
        ...favoriteData,
      };
      mockFavorites.push(newFavorite);
      return { success: true, favorite: newFavorite };
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  },

  // Remove a favorite
  removeFavorite: async (userId: string, recipeId: string): Promise<{ success: boolean }> => {
    try {
      await delay();
      mockFavorites = mockFavorites.filter(
        (fav) => !(fav.userId === userId && fav.recipeId === recipeId)
      );
      return { success: true };
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  },

  // Check if a recipe is favorited
  isFavorited: async (userId: string, recipeId: string): Promise<boolean> => {
    try {
      await delay(100); // Shorter delay for quick checks
      return mockFavorites.some(
        (fav) => fav.userId === userId && fav.recipeId === recipeId
      );
    } catch (error) {
      console.error("Error checking favorite:", error);
      return false;
    }
  },
};
