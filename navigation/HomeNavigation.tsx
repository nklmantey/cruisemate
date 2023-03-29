import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
