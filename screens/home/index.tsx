import { ActivityIndicator, View } from "react-native";
import { PrimaryButton } from "../../components/ui/Button";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../components/StyledText";
import { greetings } from "../../utils";
import SearchBar from "../../components/home/SearchBar";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const HomeScreen = () => {
  const theme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setUser({
        id: null,
        email: null,
        name: null,
        number: null,
      });
      setIsLoggedIn(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: Colors[theme].background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Ionicons name="menu" color={Colors[theme].text} size={20} />
        <BoldText>Home</BoldText>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "gainsboro",
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 5,
          marginVertical: 24,
        }}
      >
        <Ionicons name="location" color={Colors[theme].gray} size={20} />
        <BoldText style={{ color: Colors[theme].gray }}>
          TF Hostels, Accra, Ghana
        </BoldText>
      </View>

      <BoldText style={{ fontSize: 24 }}>{`${greetings()} ${
        user?.name
      }`}</BoldText>

      <SearchBar placeholder="Search" onChangeText={() => {}} />

      <PrimaryButton
        title={
          loading ? (
            <ActivityIndicator color={Colors[theme].background} />
          ) : (
            "Log out"
          )
        }
        onPress={() => handleLogout()}
      />
    </View>
  );
};

export default HomeScreen;
