import { View } from "../../components/Themed";
import EmptyState from "../../components/EmptyState";
import {
  BoldText,
  ExtraBoldText,
  RegularText,
} from "../../components/StyledText";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

const CarCard = ({
  car,
  rentalAccepted,
}: {
  car: SupplierCar;
  rentalAccepted: boolean;
}) => {
  const { navigate }: NavigationProp<HistoryStackParamList> = useNavigation();
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      // onPress={() => navigate("CarDetailsScreen")}
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
    </TouchableOpacity>
  );
};

const HistoryScreen = () => {
  const user = useUserAuthStore((state) => state.user);
  const [userRequests, setUserRequests] = useState<[]>([]);

  const fetchRequestsByUser = async () => {
    try {
      const q = query(
        collection(db, "requests"),
        where("userId", "==", user?.id)
      );

      const requestsArray: any = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        requestsArray.push(doc.data());
      });

      setUserRequests(requestsArray);
    } catch (error) {
      console.error("Error fetching user UID:", error);
    }
  };

  useEffect(() => {
    fetchRequestsByUser();
  }, [userRequests]);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <FlatList
        data={userRequests}
        renderItem={({ item }) =>
          item && (
            <CarCard car={item.car} rentalAccepted={item.rentalAccepted} />
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
  );
};

export default HistoryScreen;
