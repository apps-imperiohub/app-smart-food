import GoogleLoginButton from "@/components/googleAuth/GoogleLoginButton";
import { ScrollView, StyleSheet, View } from "react-native";
import { favoritesStyles } from "../../src/styles/favorites.styles";

const FavoritesScreen = () => {
  return (
    <View style={favoritesStyles.container}>
      <ScrollView>
        <GoogleLoginButton />
      </ScrollView>
    </View>
  );
};
export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
