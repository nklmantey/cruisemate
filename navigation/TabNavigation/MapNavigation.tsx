import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import MapScreen from "../../screens/map";
import ViewSupplierStore from "../../screens/map/ViewSupplierStore";

const Stack = createStackNavigator<MapStackParamList>();

const MapNavigation = () => {
  const { navigate, canGoBack }: NavigationProp<MapStackParamList> =
    useNavigation();
  const theme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen
        name="ViewSupplierStore"
        component={ViewSupplierStore}
        options={{
          headerLeft: () =>
            canGoBack() ? (
              <TouchableOpacity
                style={{
                  marginLeft: 16,
                }}
                onPress={() => navigate("Map")}
              >
                <Ionicons
                  name="arrow-back"
                  color={Colors[theme].text}
                  size={20}
                />
              </TouchableOpacity>
            ) : null,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapNavigation;
