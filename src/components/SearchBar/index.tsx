import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchStyles } from "../../styles/search.styles";
import { COLORS } from "../../constants/colors";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ searchQuery, onSearchChange, onClear }: SearchBarProps) => {
  return (
    <View style={searchStyles.searchSection}>
      <View style={searchStyles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textLight}
          style={searchStyles.searchIcon}
        />
        <TextInput
          style={searchStyles.searchInput}
          placeholder="Search recipes, ingredients..."
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={onClear} style={searchStyles.clearButton}>
            <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
