import { useNavigation } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SupplierCarsScreen from "../../screens/supplier/cars";
import AddCarModal from "../../screens/supplier/cars/AddCarModal";

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
        name="AddCarModal"
        component={AddCarModal}
        options={({ navigation }) => ({
          title: "Add Car",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: Colors[theme].text,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Cars")}
            >
              <Ionicons
                name="ios-arrow-down"
                size={15}
                color={Colors[theme].background}
              />
            </TouchableOpacity>
          ),
          ...TransitionPresets.ModalPresentationIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "vertical",
        })}
      />
    </Stack.Navigator>
  );
};

export default SupplierCarsNavigation;
