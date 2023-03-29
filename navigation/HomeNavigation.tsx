import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/home/Settings";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  const { canGoBack, goBack } = useNavigation();
  const theme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons name="arrow-back" color={Colors[theme].text} size={20} />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          fontFamily: "AirbnbBold",
          fontSize: 16,
          alignSelf: "center",
          textAlign: "center",
        },
        headerLeftContainerStyle: {
          marginLeft: 4,
          marginRight: 4,
          alignItems: "center",
          justifyContent: "center",
        },
        headerTitleContainerStyle: {
          width: "100%",
        },
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
