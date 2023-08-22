import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { BoldText, RegularText } from "../../../components/StyledText";

const carList = [
  {
    id: 1,
    carBrand: "Audi",
    carModel: "RS8",
    carCondition: "Good",
    rentalStatus: "Idle",
  },
  {
    id: 2,
    carBrand: "Lamborghini",
    carModel: "Urus",
    carCondition: "Excellent",
    rentalStatus: "Rented",
  },
];

const SupplierCarCard = ({ carInfo }: any) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: Colors[theme].text,
        marginTop: 16,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Image
        source={require("../../../assets/welcome-bg.jpg")}
        style={{ width: 80, height: 80, borderRadius: 8 }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <BoldText style={{ color: Colors[theme].background }}>
            {carInfo.carBrand} {carInfo.carModel}
          </BoldText>

          <View
            style={{
              backgroundColor: "lightgreen",
              alignItems: "center",
              borderRadius: 100,
              paddingHorizontal: 8,
              paddingVertical: 2,
              alignSelf: "flex-start",
              marginTop: 4,
            }}
          >
            <RegularText>{carInfo.carCondition}</RegularText>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "lightgreen",
            alignItems: "center",
            borderRadius: 100,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: "flex-start",
            marginTop: 4,
          }}
        >
          <RegularText>{carInfo.rentalStatus}</RegularText>
        </View>
      </View>
    </View>
  );
};

const SupplierCarsScreen = () => {
  const theme = useColorScheme();
  const { navigate }: NavigationProp<SupplierCarsParamList> = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[theme].background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: Colors[theme].background,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("AddCarModal")}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add-circle" size={50} color={Colors[theme].text} />
        </TouchableOpacity>

        <View>
          <RegularText>View all your cars here</RegularText>

          <FlatList
            data={carList}
            renderItem={({ item }) => <SupplierCarCard carInfo={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SupplierCarsScreen;
