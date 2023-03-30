import { TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../components/StyledText";
import { greetings } from "../../utils";
import SearchBar from "../../components/home/SearchBar";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import PopularCarsCard from "../../components/home/PopularCarsCard";

const HomeScreen = () => {
  const theme = useColorScheme();
  const user = useAuthStore((state) => state.user);

  const { navigate }: any = useNavigation();

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
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "gainsboro",
          }}
          onPress={() => navigate("Settings")}
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

      <View>
        <BoldText style={{ fontSize: 16, marginBottom: 8 }}>Car Types</BoldText>
        <PopularCarsCard />
      </View>
    </View>
  );
};

export default HomeScreen;
