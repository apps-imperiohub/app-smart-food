import ConfigurePanel from "@/components/AboutMe/ConfigurePanel";
import HeaderAboutMe from "@/components/AboutMe/headerPanel";
import { useAuth } from "@/context/AuthContext";
import { GoogleAuthScreen } from "@/screens/GoogleAuthScreen";
import { ScrollView } from "react-native";

const AboutMeScreen = () => {
  // verificar si el usuario esta autenticado con google, si no mostrar el panel de autenticacion, si si mostrar el panel de configuracion
  const { userInfo, isSigningIn, signIn, signOut } = useAuth();
  console.log("isSigningIn:", isSigningIn);

  if (!userInfo) {
    console.log("Usuario no autenticado, mostrando pantalla de login...");
    return (
      <GoogleAuthScreen
        userInfo={userInfo}
        isSigningIn={isSigningIn}
        onSignIn={signIn}
        onSignOut={signOut}
      />
    );
  }
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
