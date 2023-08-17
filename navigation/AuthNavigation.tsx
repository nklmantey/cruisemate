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
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSetupScreen from "../screens/auth/ProfileSetupScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  const theme = useColorScheme();
  const { canGoBack, goBack } = useNavigation();
  const isOnboarded = useAuthStore((state) => state.isOnboarded);

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () =>
          canGoBack() ? (
            <TouchableOpacity onPress={goBack}>
              <Ionicons
                name="arrow-back"
                color={Colors[theme].text}
                size={20}
              />
            </TouchableOpacity>
          ) : null,
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      {isOnboarded ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        </>
      ) : (
        <Stack.Screen
          name={"Welcome"}
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
