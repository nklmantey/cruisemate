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
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const theme = useColorScheme();
  const user = useUserAuthStore((state) => state.user);
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
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Colors[theme].grayLight,
              }}
            >
              <Ionicons name="person" color={Colors[theme].gray} size={15} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigate("Settings")}>
              <Image
                source={{ uri: user?.avatar }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            columnGap: 5,
            marginTop: 24,
          }}
        >
          <Ionicons name="location" color={Colors[theme].gray} size={20} />
          <BoldText style={{ color: Colors[theme].gray }}>
            TF Hostels, Accra, Ghana
          </BoldText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
