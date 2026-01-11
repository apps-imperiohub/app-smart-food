import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { recipeDetailStyles } from "../../styles/recipe-detail.styles";
import { COLORS, GRADIENTS } from "../../constants/colors";

interface RecipeVideoTutorialProps {
  youtubeUrl: string;
  getYouTubeEmbedUrl: (url: string) => string;
}

export const RecipeVideoTutorial = ({
  youtubeUrl,
  getYouTubeEmbedUrl,
}: RecipeVideoTutorialProps) => {
  return (
    <View style={recipeDetailStyles.sectionContainer}>
      <View style={recipeDetailStyles.sectionTitleRow}>
        <LinearGradient
          colors={GRADIENTS.videoTutorial}
          style={recipeDetailStyles.sectionIcon}
        >
          <Ionicons name="play" size={16} color={COLORS.white} />
        </LinearGradient>

        <Text style={recipeDetailStyles.sectionTitle}>Video Tutorial</Text>
      </View>

      <View style={recipeDetailStyles.videoCard}>
        <WebView
          style={recipeDetailStyles.webview}
          source={{ uri: getYouTubeEmbedUrl(youtubeUrl) }}
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </View>
  );
};
