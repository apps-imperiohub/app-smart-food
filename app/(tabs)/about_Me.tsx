import ConfigurePanel from "@/components/AboutMe/ConfigurePanel";
import HeaderAboutMe from "@/components/AboutMe/headerPanel";
import { useUser } from "@/context/UserContext";
import { ActivityIndicator, ScrollView, Text } from "react-native";

const AboutMeScreen = () => {
  const { user, loading, error, refreshUser } = useUser();
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  if (!user) return <Text>No hay usuario</Text>;
  return (
    <ScrollView>
      <HeaderAboutMe
        nombre={user.nombre}
        gmail={user.email}
        img={user.picture}
        pais="Mexico"
      />
      <ConfigurePanel />
    </ScrollView>
  );
};
export default AboutMeScreen;
