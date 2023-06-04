import { useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import HistoryScreen from "../../screens/history";

const Stack = createStackNavigator<HistoryStackParamList>();

const HistoryNavigation = () => {
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
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default HistoryNavigation;
