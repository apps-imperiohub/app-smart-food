export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image: string;
  cookTime?: string;
  servings?: number;
  category?: string;
  area?: string;
  ingredients?: string[];
  instructions?: string[];
  youtubeUrl?: string | null;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description?: string;
}

export interface FavoriteRecipe {
  id: string;
  recipeId: string;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
}
