import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { recipeCardStyles } from "../../styles/home.styles";
import { Recipe } from "../../types/recipe";
import { recipeCardStyles } from "./styles";

interface RecipeCardProps {
  recipe: Recipe;
}

const renderStars = (rating: string | undefined) => {
  if (!rating) {
    return (
      <View style={{ flexDirection: "row" }}>
        {[...Array(5)].map((_, i) => (
          <FontAwesome key={i} name="star-o" size={14} color="#FFD700" />
        ))}
      </View>
    );
  }

  const numRating = parseFloat(rating);
  if (isNaN(numRating)) {
    return (
      <View style={{ flexDirection: "row" }}>
        {[...Array(5)].map((_, i) => (
          <FontAwesome key={i} name="star-o" size={14} color="#FFD700" />
        ))}
      </View>
    );
  }

  const fullStars = Math.floor(numRating);
  const hasHalfStar = numRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesome key={`full-${i}`} name="star" size={14} color="#FFD700" />
      ))}
      {hasHalfStar && (
        <FontAwesome key="half" name="star-half-o" size={14} color="#FFD700" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome key={`empty-${i}`} name="star-o" size={14} color="#FFD700" />
      ))}
    </View>
  );
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={recipeCardStyles.container}
      onPress={(e) => {
        e.stopPropagation();
        router.push(`/recipe/${recipe.id}`);
      }}
      activeOpacity={0.8}
    >
      {/* imagen a la izquierda */}
      <Image
        source={{ uri: `${recipe.image}` }}
        style={recipeCardStyles.image}
      />

      {/* en el centro titulo descripcion y precio */}
      <View style={recipeCardStyles.infoContainer}>
        <View style={recipeCardStyles.infoContainer_header}>
          <Text style={recipeCardStyles.infoContainer_header_title}>
            {recipe.title}
          </Text>
          <View style={recipeCardStyles.infoContainer_header_number}>
            <Text style={recipeCardStyles.infoContainer_header_number_text}>
              {recipe.stars} {renderStars(recipe.stars)}
            </Text>
            <Text style={recipeCardStyles.infoContainer_header_number_text}>({recipe.sales})</Text>
          </View>
        </View>

        {recipe.description && (
          <Text style={recipeCardStyles.description} numberOfLines={2}>
            {recipe.description}
          </Text>
        )}

        {recipe.price && (
          <Text style={recipeCardStyles.price}>
            ${recipe.price}
          </Text>
        )}

        <View style={recipeCardStyles.footer}>
          <TouchableOpacity
            style={recipeCardStyles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              // logica para añadir al carrito
            }}
          >
            <Text style={recipeCardStyles.addButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Calificacion y boton */}
      {/* <View>
        <View>
          <Text>{recipe.stars}</Text>
          <Text>{recipe.sales}</Text>
        </View>

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            // logica para añador al carrito
          }}
        >
          <Text>🛒</Text>
        </Pressable>
      </View> */}
    </TouchableOpacity>
  );
}
