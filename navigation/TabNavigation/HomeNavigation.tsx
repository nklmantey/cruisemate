import { useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../screens/home";
import SettingsScreen from "../../screens/home/Settings";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import CarDetails from "../../screens/home/CarDetails";
import CarRental from "../../screens/home/CarRental";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  const { goBack } = useNavigation();
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
          marginLeft: 8,
          alignItems: "center",
          justifyContent: "center",
        },
        headerTitleContainerStyle: {
          width: "100%",
        },
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
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
      <Stack.Screen
        name="CarDetails"
        component={CarDetails}
        options={{ title: "Car Details" }}
      />
      <Stack.Screen
        name="CarRental"
        component={CarRental}
        options={{ title: "Rental Booking" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
