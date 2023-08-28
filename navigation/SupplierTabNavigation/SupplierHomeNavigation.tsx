import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SupplierHomeScreen from "../../screens/supplier/home";
import RentalDetails from "../../screens/supplier/home/RentalDetails";

const Stack = createStackNavigator<SupplierHomeParamList>();

const SupplierHomeNavigation = () => {
  const { canGoBack, goBack } = useNavigation();
  const theme = useColorScheme();
  const { navigate }: NavigationProp<SupplierHomeParamList> = useNavigation();

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
      <Stack.Screen name="SupplierHome" component={SupplierHomeScreen} />
      <Stack.Screen
        name="RentalDetails"
        component={RentalDetails}
        options={{
          title: "Rental Details",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigate("SupplierHome")}
            >
              <Ionicons
                name="arrow-back"
                color={Colors[theme].text}
                size={20}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SupplierHomeNavigation;
