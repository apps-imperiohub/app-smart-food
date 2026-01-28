import ConfigurePanel from "@/components/AboutMe/ConfigurePanel";
import HeaderAboutMe from "@/components/AboutMe/headerPanel";
import { ScrollView } from "react-native";

const AboutMeScreen = () => {
  return (
    <ScrollView>
      <HeaderAboutMe
        nombre="Aldo"
        gmail="Aldo@gmail.com"
        img="https://avatars.githubusercontent.com/u/52204213?v=4"
        pais="Mexico"
      />
      <ConfigurePanel />
    </ScrollView>
  );
};
export default AboutMeScreen;
