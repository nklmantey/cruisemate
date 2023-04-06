import { ColorSchemeName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";
import TabNavigation from "./TabNavigation";
import AuthNavigation from "./AuthNavigation";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name="TabStack" component={TabNavigation} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
