import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SupplierCarsScreen from "../../screens/supplier/cars";
import AddCarScreen from "../../screens/supplier/cars/AddCarScreen";
import CarDetailsScreen from "../../screens/supplier/cars/CarDetailsScreen";

const Stack = createStackNavigator<SupplierCarsParamList>();

const SupplierCarsNavigation = () => {
  const theme = useColorScheme();

  return (
    <Stack.Navigator
      initialRouteName="Cars"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Cars" component={SupplierCarsScreen} />
      <Stack.Screen
        name="AddCarScreen"
        component={AddCarScreen}
        options={({ navigation }) => ({
          title: "Add Car",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
              }}
              onPress={() => navigation.navigate("Cars")}
            >
              <Ionicons
                name="ios-arrow-back"
                size={20}
                color={Colors[theme].text}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CarDetailsScreen"
        component={CarDetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
              }}
              onPress={() => navigation.navigate("Cars")}
            >
              <Ionicons
                name="ios-arrow-back"
                size={20}
                color={Colors[theme].text}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SupplierCarsNavigation;
