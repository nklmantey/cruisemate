import { useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../../screens/home";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SupplierProfile from "../../screens/supplier/SupplierProfile";

const Stack = createStackNavigator<ProfileStackParamList>();

const SupplierProfileNavigation = () => {
  const theme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "InterSoftBold",
          fontSize: 16,
          alignSelf: "center",
          textAlign: "center",
        },
        headerLeftContainerStyle: {
          marginLeft: 8,
          alignItems: "center",
          justifyContent: "center",
        },
        headerTitleContainerStyle: {
          width: "100%",
        },
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Profile" component={SupplierProfile} />
    </Stack.Navigator>
  );
};

export default SupplierProfileNavigation;
