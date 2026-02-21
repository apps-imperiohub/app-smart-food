import { favoritesStyles } from "@/styles/favorites.styles";
import type { RecipeHeaderProps } from "@/types/recipe";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  handleGoBack,
  source,
  title,
}) => (
  <>
    <View style={style.header}>
      <TouchableOpacity onPress={handleGoBack}>
        <Svg viewBox="0 0 24 24" width={24} height={24}>
          <Path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            fill="#000000"
          />
        </Svg>
      </TouchableOpacity>
      <View>
        <Text style={favoritesStyles.title}>{title}</Text>
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
    {source && (
      <View style={{ padding: 16 }}>
        <Image
          source={{ uri: source }}
          style={{ width: "100%", height: 300, borderRadius: 50 }}
          resizeMode="cover"
        />
      </View>
    )}
  </>
);
export default RecipeHeader;

const style = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
