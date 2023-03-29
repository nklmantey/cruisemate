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

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  let user = false;

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="HomeStack" component={HomeNavigation} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
