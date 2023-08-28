import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { PrimaryButton } from "../../../components/ui/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../config/firebase";
import { useSupplierAuthStore } from "../../../store/useSupplierAuthStore";
import { BoldText, ExtraBoldText } from "../../../components/StyledText";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import EmptyState from "../../../components/EmptyState";

const CarCard = ({
  car,
  rentalAccepted,
}: {
  car: SupplierCar;
  rentalAccepted: boolean;
}) => {
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
          backgroundColor: Colors[theme].text,
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
            backgroundColor: rentalAccepted ? "limegreen" : "gold",
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 100,
          }}
        >
          <BoldText style={{ color: Colors[theme].text }}>
            {rentalAccepted ? "Rental accepted" : "Pending acceptance"}
          </BoldText>
        </View>
      </View>
    </View>
  );
};

const SupplierHomeScreen = () => {
  const supplier = useSupplierAuthStore((state) => state.supplier);
  const setIsSupplierLoggedIn = useSupplierAuthStore(
    (state) => state.setIsSupplierLoggedIn
  );
  const { navigate }: NavigationProp<SupplierHomeParamList> = useNavigation();
  const theme = useColorScheme();
  const [supplierRequests, setSupplierRequests] = useState<[]>([]);

  const fetchRequestsBySupplier = async () => {
    try {
      const q = query(
        collection(db, "requests"),
        where("supplierId", "==", supplier?.id)
      );

      const requestsArray: any = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        requestsArray.push({
          uid: doc.id,
          ...doc.data(),
        });
      });

      setSupplierRequests(requestsArray);
    } catch (error) {
      console.error("Error fetching user UID:", error);
    }
  };

  // console.log(supplierRequests);

  useEffect(() => {
    fetchRequestsBySupplier();
  }, [supplierRequests]);

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
          paddingHorizontal: 16,
          paddingTop: 30,
        }}
      >
        <ExtraBoldText style={{ fontSize: 24 }}>
          View all your car rental requests here
        </ExtraBoldText>

        <FlatList
          data={supplierRequests}
          style={{ marginTop: 16 }}
          renderItem={({ item }) =>
            item && (
              <TouchableOpacity
                onPress={() =>
                  navigate("RentalDetails", {
                    data: item,
                  })
                }
              >
                <CarCard car={item.car} rentalAccepted={item.rentalAccepted} />
              </TouchableOpacity>
            )
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
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
        />
      </View>
    </SafeAreaView>
  );
};

export default SupplierHomeScreen;
