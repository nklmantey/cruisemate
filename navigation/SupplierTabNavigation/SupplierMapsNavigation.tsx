import { useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SupplierTrackingScreen from "../../screens/supplier/maps";

const Stack = createStackNavigator<SupplierMapParamList>();

const SupplierMapsNavigation = () => {
  const { canGoBack, goBack } = useNavigation();
  const theme = useColorScheme();

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
      <Stack.Screen name="VehicleTracking" component={SupplierTrackingScreen} />
    </Stack.Navigator>
  );
};

export default SupplierMapsNavigation;
