// Mock favorites storage (in-memory)
let mockFavorites = [];

// Simulate API delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const FavoritesAPI = {
  // Get all favorites for a user
  getFavorites: async (userId) => {
    try {
      await delay();
      return mockFavorites.filter((fav) => fav.userId === userId);
    } catch (error) {
      console.error("Error getting favorites:", error);
      throw error;
    }
  },

  // Add a favorite
  addFavorite: async (favoriteData) => {
    try {
      await delay();
      const newFavorite = {
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
  removeFavorite: async (userId, recipeId) => {
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
  isFavorited: async (userId, recipeId) => {
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
