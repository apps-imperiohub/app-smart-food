import Entrega from "@/components/AboutMe/entrega";
import { useUser } from "@/context/UserContext";
import { View } from "react-native";

const OrdersScreen = () => {
  const { user, loading, error, refreshUser } = useUser();

  return (
    <View>
      <Entrega direcciones={user?.direccionnesEnvios} />
    </View>
  );
};

export default OrdersScreen;
