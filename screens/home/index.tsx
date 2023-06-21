import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../components/StyledText";
import { greetings } from "../../utils";
import SearchBar from "../../components/home/SearchBar";
import { useAuthStore } from "../../store/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PopularCarsCard from "../../components/home/PopularCarsCard";

const HomeScreen = () => {
  const theme = useColorScheme();
  const user = useAuthStore((state) => state.user);
  const { navigate }: NavigationProp<HomeStackParamList> = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
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
          {!user?.avatar || user?.avatar === null ? (
            <TouchableOpacity
              onPress={() => navigate("Settings")}
              style={{
                width: 45,
                height: 45,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Colors[theme].grayLight,
              }}
            >
              <Ionicons name="person" color={Colors[theme].gray} size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigate("Settings")}>
              <Image
                source={{ uri: user?.avatar }}
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </TouchableOpacity>
          )}
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

        <SearchBar placeholder="Search" onChangeText={() => {}} />

        <View style={{ width: "100%" }}>
          <BoldText style={{ fontSize: 16, marginTop: 24 }}>
            Popular cars around you
          </BoldText>

          <PopularCarsCard
            name="BMW Sports Coupe"
            price="10"
            // onPress={() => navigate("CarDetails")}
          />

          {/* <PrimaryButton
          title={loading ? <ActivityIndicator /> : "Update"}
          onPress={async () => {
            setLoading(true);
            await setDoc(
              doc(
                db,
                "users",
                `${user?.id}`,
                "history",
                `${genRandomString(28)}`
              ),
              {
                rideCancelled: "yes",
              },
              {
                merge: true
              }
            );
            setLoading(false);
          }}
        /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
