import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { BoldText, MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import SupplierHomeNavigation from "./SupplierHomeNavigation";
import SupplierCarsNavigation from "./SupplierCarsNavigation";
import SupplierMapsNavigation from "./SupplierMapsNavigation";

const Tab = createBottomTabNavigator<SupplierTabStackParamList>();

const SupplierTabNavigation = () => {
  const theme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].background,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={SupplierHomeNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="home-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Home
                </MediumText>
              </View>
            ) : (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="MapStack"
        component={SupplierMapsNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="map-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Vehicle Tracking
                </MediumText>
              </View>
            ) : (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="CarsStack"
        component={SupplierCarsNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="car-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Cars
                </MediumText>
              </View>
            ) : (
              <Ionicons name="car-outline" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SupplierTabNavigation;
