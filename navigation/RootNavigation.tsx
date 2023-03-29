import { ColorSchemeName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

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
          <Stack.Screen name="HomeStack" component={HomeNavigation} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
