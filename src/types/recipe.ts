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
  price?: string;
  stars?: string;
  sales?: string;
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
export interface RecipeHeaderProps {
  handleGoBack?: () => void;
  source?: string;
  title: string;
}
export interface RecipeOrdersProps {
  title: string;
  mounted: number;
  setMounted: React.Dispatch<React.SetStateAction<number>>;
  description?: string;
  star?: string;
  cookTime?: string;
  size: {
    text: string;
    Value: number;
  }[];
  ingredients?: string[];
}
export interface RecipeIngredientsProps {
  ingredients?: string[];
  incrementIngredient: (index: number) => void;
  decrementIngredient: (index: number) => void;
  parseIngredient: (ingredient: string) => {
    original: string;
    quantity: string;
    name: string;
  };
  ingredientQuantities: {
    [key: number]: number;
  };
  setIngredientQuantities: React.Dispatch<
    React.SetStateAction<{
      [key: number]: number;
    }>
  >;
}
export interface RecipeCartProps {
  id: string;
  onPriceChange?: (price: number) => void;
}
