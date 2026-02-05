import { COLORS, TRANSPARENT } from "@/constants/colors";
import { favoritesStyles } from "@/styles/favorites.styles";
import type { RecipeOrdersProps } from "@/types/recipe";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const RecipeOrder: React.FC<RecipeOrdersProps> = ({
  title,
  mounted,
  setMounted,
  description,
  star,
  cookTime,
  size,
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(0);
  return (
    <>
      <View style={style.order}>
        <View style={{ display: "flex", flexDirection: "column", padding: 10 }}>
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
            {title}
          </Text>
        </View>
        <View style={style.add}>
          <TouchableOpacity
            onPress={() => setMounted(mounted + 1)}
            style={style.svg}
          >
            <Svg viewBox="0 0 24 24" width="100%" height="100%">
              <Path
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                fill={COLORS.white}
              />
            </Svg>
          </TouchableOpacity>
          <Text>{mounted}</Text>
          <TouchableOpacity
            onPress={() => setMounted(mounted - 1)}
            style={{
              ...style.svg,
              backgroundColor:
                mounted <= 0 ? COLORS.disabled : style.svg.backgroundColor,
            }}
            disabled={mounted <= 0}
          >
            <Svg viewBox="0 0 24 24" width="100%" height="100%">
              <Path
                d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
                fill={mounted <= 0 ? COLORS.text : COLORS.white}
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.descriptionContainer}>
        <Text style={style.descriptionText}>{description}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              marginTop: 20,
            }}
          >
            <View style={{ ...style.svg, backgroundColor: TRANSPARENT }}>
              <Svg viewBox="0 0 24 24" width="100%" height="100%">
                <Path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={COLORS.text}
                />
              </Svg>
            </View>
            <Text>{star}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              marginTop: 20,
            }}
          >
            <View style={{ ...style.svg, backgroundColor: TRANSPARENT }}>
              <Svg viewBox="0 0 24 24" width="100%" height="100%">
                <Path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"
                  fill={COLORS.text}
                />
              </Svg>
            </View>
            <Text>{cookTime}</Text>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingHorizontal: 5,
          }}
        >
          <Text style={favoritesStyles.title}>Size:</Text>
          {size.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedSize(index)}
              style={[
                style.descriptionContainer,
                style.size,
                selectedSize === index && style.sizeCircleActive,
              ]}
            >
              <Text
                style={[
                  favoritesStyles.title,
                  style.sizeText,
                  selectedSize === index && style.sizeTextAct,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default RecipeOrder;

const style = StyleSheet.create({
  svg: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: 32, // Mismo que el SVG
    height: 32, // Mismo que el SVG
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 40,
    width: 85,
    padding: 2,
    borderRadius: 20,
  },
  order: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
    height: 80,
  },
  descriptionContainer: {
    borderRadius: 12,
    padding: 5,
    marginHorizontal: 15,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555555",
    textAlign: "justify",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 20,
  },

  size: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    height: "100%",
  },
  sizeCircleActive: {
    backgroundColor: COLORS.primary + "20", // Color con transparencia
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  sizeText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  sizeTextAct: {
    color: COLORS.primary,
  },
});
