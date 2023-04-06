import { FlatList, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../components/StyledText";
import { greetings } from "../../utils";
import SearchBar from "../../components/home/SearchBar";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import PopularCarsCard from "../../components/home/PopularCarsCard";
import { CarTypes } from "../../constants/Data";

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

      <View style={{ width: "100%" }}>
        <BoldText style={{ fontSize: 16, marginVertical: 8 }}>
          Car Types
        </BoldText>

        <FlatList
          data={CarTypes}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                backgroundColor: Colors[theme].text,
                padding: 8,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: item.id === 1 ? 0 : 8,
              }}
            >
              <BoldText style={{ color: Colors[theme].background }}>
                {item.type}
              </BoldText>
            </View>
          )}
          horizontal
        />
        {/* <PopularCarsCard /> */}
      </View>
    </View>
  );
};

export default HomeScreen;
