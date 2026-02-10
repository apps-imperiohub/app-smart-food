import { COLORS } from "@/constants/colors";
import type { RecipeIngredientsProps } from "@/types/recipe";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
  incrementIngredient,
  decrementIngredient,
  parseIngredient,
  ingredientQuantities,
  setIngredientQuantities,
}) => {
  const midIndex = ingredients ? Math.ceil(ingredients.length / 2) : 0;
  const column1 = ingredients ? ingredients.slice(0, midIndex) : [];
  const column2 = ingredients ? ingredients.slice(midIndex) : [];
  return (
    <View style={style.container}>
      {ingredients && ingredients.length > 0 ? (
        <View style={style.columnsContainer}>
          {/* Columna 1 */}
          <View style={style.column}>
            {column1.map((ingredient, originalIndex) => {
              const parsed = parseIngredient(ingredient);
              const quantity = ingredientQuantities[originalIndex] || 0;
              const adjustedQuantity = quantity > 0 ? quantity : 0; // Muestra 1 como base

              return (
                <View key={originalIndex} style={style.ingredientRow}>
                  {/* Contador */}
                  <View style={style.quantityControls}>
                    <TouchableOpacity
                      onPress={() => decrementIngredient(originalIndex)}
                      style={[
                        style.quantityButton,
                        quantity <= 0 && style.quantityButtonDisabled,
                      ]}
                      disabled={quantity <= 0}
                    >
                      <Text style={style.quantityButtonText}>−</Text>
                    </TouchableOpacity>

                    <Text style={style.quantityText}>{adjustedQuantity}x</Text>

                    <TouchableOpacity
                      onPress={() => incrementIngredient(originalIndex)}
                      style={style.quantityButton}
                    >
                      <Text style={style.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Ingrediente */}
                  <View style={style.ingredientInfo}>
                    <Text style={style.ingredientName}>
                      {parsed.name || parsed.original}
                    </Text>
                    {parsed.quantity && (
                      <Text style={style.ingredientQuantity}>
                        {parsed.quantity}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Columna 2 */}
          <View style={style.column}>
            {column2.map((ingredient, index) => {
              const originalIndex = index + midIndex;
              const parsed = parseIngredient(ingredient);
              const quantity = ingredientQuantities[originalIndex] || 0;
              const adjustedQuantity = quantity > 0 ? quantity : 0;

              return (
                <View key={originalIndex} style={style.ingredientRow}>
                  <View style={style.quantityControls}>
                    <TouchableOpacity
                      onPress={() => decrementIngredient(originalIndex)}
                      style={[
                        style.quantityButton,
                        quantity <= 0 && style.quantityButtonDisabled,
                      ]}
                      disabled={quantity <= 0}
                    >
                      <Text style={style.quantityButtonText}>−</Text>
                    </TouchableOpacity>

                    <Text style={style.quantityText}>{adjustedQuantity}x</Text>

                    <TouchableOpacity
                      onPress={() => incrementIngredient(originalIndex)}
                      style={style.quantityButton}
                    >
                      <Text style={style.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={style.ingredientInfo}>
                    <Text style={style.ingredientName}>
                      {parsed.name || parsed.original}
                    </Text>
                    {parsed.quantity && (
                      <Text style={style.ingredientQuantity}>
                        {parsed.quantity}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <Text style={style.noIngredients}>No hay ingredientes disponibles</Text>
      )}
    </View>
  );
};
export default RecipeIngredients;

const style = StyleSheet.create({
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  noIngredients: {
    fontSize: 14,
    color: "#636E72",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F8F9FA",
    padding: 3,
    borderRadius: 10,
    borderColor: "#E9ECEF",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  quantityButtonDisabled: {
    backgroundColor: "#E9ECEF",
  },
  quantityButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.text,
    marginHorizontal: 2,
    minWidth: 25,
    textAlign: "center",
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 2,
  },
  ingredientQuantity: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
