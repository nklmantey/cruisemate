import { ColorSchemeName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useUserAuthStore } from "../store/useUserAuthStore";
import TabNavigation from "./TabNavigation";
import AuthNavigation from "./AuthNavigation";
import { useSupplierAuthStore } from "../store/useSupplierAuthStore";
import SupplierTabNavigation from "./SupplierTabNavigation";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const isLoggedIn = useUserAuthStore((state) => state.isLoggedIn);
  const isSupplierLoggedIn = useSupplierAuthStore(
    (state) => state.isSupplierLoggedIn
  );

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
        ) : isSupplierLoggedIn ? (
          <Stack.Screen
            name="SupplierTabStack"
            component={SupplierTabNavigation}
          />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
