import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  const theme = useColorScheme();
  const { canGoBack, goBack } = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerLeft: () =>
          canGoBack() ? (
            <TouchableOpacity onPress={() => goBack()}>
              <Ionicons
                name="arrow-back"
                color={Colors[theme].text}
                size={20}
              />
            </TouchableOpacity>
          ) : null,
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
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
