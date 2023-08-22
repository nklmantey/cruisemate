import { View, Text } from "react-native";
import { PrimaryButton } from "../../../components/ui/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useSupplierAuthStore } from "../../../store/useSupplierAuthStore";

const SupplierHomeScreen = () => {
  const setSupplier = useSupplierAuthStore((state) => state.setSupplier);
  const setIsSupplierLoggedIn = useSupplierAuthStore(
    (state) => state.setIsSupplierLoggedIn
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSupplier({
        id: "",
        email: "",
        number: "",
        shopLocation: {
          lat: 0,
          lng: 0,
        },
        shopName: "",
      });

      setIsSupplierLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <PrimaryButton title={"logo"} onPress={() => handleLogout()} />
    </View>
  );
};
export default SupplierHomeScreen;
