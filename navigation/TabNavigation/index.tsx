import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { BoldText, MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import MapNavigation from "./MapNavigation";
import HistoryNavigation from "./HistoryNavigation";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigation = () => {
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
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="car-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Home
                </MediumText>
              </View>
            ) : (
              <Ionicons name="car-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="MapStack"
        component={MapNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="map-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  Map
                </MediumText>
              </View>
            ) : (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="HistoryStack"
        component={HistoryNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={{ alignItems: "center" }}>
                <Ionicons name="time-outline" size={size} color={color} />
                <MediumText style={{ fontSize: 12, color: color }}>
                  History
                </MediumText>
              </View>
            ) : (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
