import { COLORS } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useRecipeDetail } from "../../src/hooks/useRecipeDetail";
import { recipeDetailStyles } from "../../src/styles/recipe-detail.styles";

const RecipeDetailScreen = () => {
  const { id: recipeId } = useLocalSearchParams<{ id: string }>();
  const [mounted, setMounted] = useState(0);
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
  console.log("Recipe Details:", recipe);
  return (
    <View style={recipeDetailStyles.container}>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View>
            <Svg viewBox="0 0 24 24" width={24} height={24}>
              <Path
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                fill="#000000"
              />
            </Svg>
          </View>
          <View>
            <Text style={favoritesStyles.title}>My Cart</Text>
          </View>
          <View>
            <Svg viewBox="0 0 24 24" width="32" height="32">
              <Path
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                fill="#000000"
              />
            </Svg>
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <Image
            source={{ uri: recipe.image }}
            style={{ width: "100%", height: 300, borderRadius: 50 }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            width: "100%",
            height: 80,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "column", padding: 10 }}
          >
            <Text
              style={{
                ...favoritesStyles.title,
                fontSize: 14,
                color: COLORS.textLight,
                fontWeight: "normal",
              }}
            >
              Your Orders
            </Text>
            <Text style={{ ...favoritesStyles.title, fontSize: 16 }}>
              {recipe.title}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffff",
              height: "100%",
              width: 80,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setMounted(mounted + 1)}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 50,
                padding: 10,
                width: 25,
                height: 25,
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <Text>{mounted}</Text>
            <TouchableOpacity
              onPress={() => setMounted(mounted - 1)}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 50,
                padding: 10,
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg viewBox="0 0 24 24" width={32} height={32}>
                <Path
                  d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
                  fill="#000000"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetailScreen;
