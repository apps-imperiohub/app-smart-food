import { useUser } from "@/context/UserContext";
import { ActivityIndicator, Button, Text, View } from "react-native";

function LoginScreen() {
  const { user, loading, error, refreshUser } = useUser();

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  if (!user) return <Text>No hay usuario</Text>;
  return (
    // <GoogleAuthScreen />
    <View>
      <Text>👤 {user.nombre}</Text>
      <Text>📧 {user.email}</Text>

      {user.direccionnesEnvios?.map((dir) => (
        <Text key={dir.id}>
          📍 {dir.calle}, {dir.ciudad}
        </Text>
      ))}

      <Button title="Refrescar" onPress={refreshUser} />
    </View>
  );
}
export default LoginScreen;
