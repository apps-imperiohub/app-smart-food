import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { favoritesStyles } from "../../styles/favorites.styles";

interface FavoritesHeaderProps {
  onSignOut: () => void;
}

const FavoritesHeader = ({ onSignOut }: FavoritesHeaderProps) => {
  return (
    <View style={favoritesStyles.header}>
      <Text style={favoritesStyles.title}>Favorites</Text>
      <TouchableOpacity style={favoritesStyles.logoutButton} onPress={onSignOut}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

export default FavoritesHeader;
