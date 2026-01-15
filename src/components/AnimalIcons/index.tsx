import { Image } from "expo-image";
import { View } from "react-native";
import { homeStyles } from "../../styles/home.styles";

const AnimalIcons = () => {
  return (
    <View style={homeStyles.welcomeSection}>
      <Image
        source={require("../../../assets/images/lamb.png")}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Image
        source={require("../../../assets/images/chicken.png")}
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Image
        source={require("../../../assets/images/pork.png")}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

export default AnimalIcons;
