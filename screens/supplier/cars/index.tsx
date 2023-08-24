import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { BoldText, ExtraBoldText } from "../../../components/StyledText";
import { useSupplierAuthStore } from "../../../store/useSupplierAuthStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useCallback, useState } from "react";
import { showMessage } from "react-native-flash-message";
import EmptyState from "../../../components/EmptyState";

const SupplierCarCard = (car: SupplierCar) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: Colors[theme].text,
        width: "100%",
        height: 300,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: car.pictures[0] }}
        style={{
          width: "100%",
          height: "70%",
          borderRadius: 6,
        }}
        resizeMode="cover"
      />
      <ExtraBoldText
        style={{
          color: Colors[theme].background,
          marginTop: 18,
          marginBottom: 6,
          fontSize: 16,
        }}
      >
        {car.carBrand} {car.carModel}
      </ExtraBoldText>

      <View
        style={{
          marginTop: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 5,
        }}
      >
        <ExtraBoldText
          style={{
            color: Colors[theme].background,
            opacity: 0.5,
            fontSize: 16,
          }}
        >
          GHC {car.dailyPrice}/day
        </ExtraBoldText>

        <View
          style={{
            backgroundColor:
              car.carCondition === "excellent"
                ? "limegreen"
                : car.carCondition === "good"
                ? "palegreen"
                : car.carCondition === "fair"
                ? "gold"
                : "crimson",
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 100,
          }}
        >
          <BoldText style={{ color: Colors[theme].text }}>
            {car.carCondition === "excellent"
              ? "Excellent condition"
              : car.carCondition === "good"
              ? "Good condition"
              : car.carCondition === "fair"
              ? "Fair condition"
              : "Poor condition"}
          </BoldText>
        </View>
      </View>
    </View>
  );
};

const SupplierCarsScreen = () => {
  const theme = useColorScheme();
  const { navigate }: NavigationProp<SupplierCarsParamList> = useNavigation();
  const [supplierCars, setSupplierCars] = useState<SupplierCar[]>([]);
  const [fetchingSupplierCars, setFetchingSupplierCars] = useState(false);
  const supplier = useSupplierAuthStore((state) => state.supplier);

  const fetchAllSupplierCars = async () => {
    const supplierDocRef =
      supplier && doc(db, `rentalsuppliers/${supplier?.id}`);

    setFetchingSupplierCars(true);

    try {
      const supplierDocSnap = await getDoc(supplierDocRef!);

      if (supplierDocSnap.exists()) {
        const supplierData = supplierDocSnap.data();

        if (supplierData.cars && supplierData.cars.length > 0) {
          setSupplierCars(supplierData.cars.reverse());
          setFetchingSupplierCars(false);
        } else {
          setSupplierCars([]);
        }
      } else {
        showMessage({
          message: "Failed to fetch your carsm try again!",
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Failed to fetch your carsm try again!",
        type: "danger",
        icon: "danger",
      });
    } finally {
      setFetchingSupplierCars(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllSupplierCars();
    }, [])
  );

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
          onPress={() => navigate("AddCarScreen")}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            width: 60,
            height: 60,
            backgroundColor: Colors[theme].text,
            borderRadius: 30,
          }}
        >
          <Ionicons name="add" size={30} color={Colors[theme].background} />
        </TouchableOpacity>

        <FlatList
          data={supplierCars}
          refreshControl={
            <RefreshControl
              refreshing={fetchingSupplierCars}
              onRefresh={() => {
                fetchAllSupplierCars();
              }}
            />
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmptyState>
                <BoldText
                  style={{ fontSize: 24, textAlign: "center", marginTop: 16 }}
                >
                  No cars to show
                </BoldText>
              </EmptyState>
            </View>
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <SupplierCarCard {...item} />}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};
export default SupplierCarsScreen;
