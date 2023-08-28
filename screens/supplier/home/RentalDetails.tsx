import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
import { ExtraBoldText, RegularText } from "../../../components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { capitalizeWords } from "../../../utils";
import { PrimaryButton } from "../../../components/ui/Button";
import { showMessage } from "react-native-flash-message";

type RouteParams = {
  params: {
    data: any;
  };
};

const RentalDetails = () => {
  const { params }: RouteProp<RouteParams> = useRoute();
  const { navigate }: NavigationProp<SupplierHomeParamList> = useNavigation();
  const theme = useColorScheme();
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const getUserData = async (uid: string) => {
    const userDocRef = doc(db, "users", `${uid}`);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      setUserData(userDocSnap.data());
    } else {
      console.log("No such document");
    }
    return;
  };

  useEffect(() => {
    if (params) {
      getUserData(params.data.userId);
    }
  }, []);

  const handleRentalRequest = async (status: "accepted" | "rejected") => {
    setLoading(true);
    const docRef = doc(db, "requests", `${params.data.uid}`);

    if (status === "accepted") {
      try {
        await updateDoc(docRef, {
          rentalAccepted: true,
        });
        showMessage({
          message: "Car rental request accepted!",
          type: "success",
          icon: "success",
        });

        navigate("SupplierHome");
      } catch (e) {
        console.log(e);
        showMessage({
          message: "Failed to add car!",
          type: "danger",
          icon: "danger",
        });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await updateDoc(docRef, {
          rentalAccepted: false,
          requestDenied: "true",
        });
        showMessage({
          message: "Car rental request rejected!",
          type: "success",
          icon: "success",
        });

        navigate("SupplierHome");
      } catch (e) {
        console.log(e);
        showMessage({
          message: "Failed to carry out action!",
          type: "danger",
          icon: "danger",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ backgroundColor: Colors[theme].background, padding: 16 }}
        >
          <ExtraBoldText style={{ fontSize: 20, color: Colors[theme].text }}>
            User Information
          </ExtraBoldText>

          {userData === null ? (
            <ActivityIndicator size={20} color="black" />
          ) : (
            <View style={{ marginTop: 16, gap: 12 }}>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={15}
                  color={Colors[theme].text}
                />
                <RegularText>{userData.fullName}</RegularText>
              </View>

              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Ionicons
                  name="mail-outline"
                  size={15}
                  color={Colors[theme].text}
                />
                <RegularText>{userData.email}</RegularText>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: Colors[theme].background,
            padding: 16,
            marginTop: 16,
          }}
        >
          <ExtraBoldText style={{ fontSize: 20, color: Colors[theme].text }}>
            Contact Information
          </ExtraBoldText>

          {userData === null ? (
            <ActivityIndicator size={20} color="black" />
          ) : (
            <View style={{ marginTop: 16, gap: 12 }}>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Ionicons
                  name="call-outline"
                  size={15}
                  color={Colors[theme].text}
                />
                <RegularText>{userData.phone}</RegularText>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: Colors[theme].background,
            padding: 16,
            marginTop: 16,
          }}
        >
          <ExtraBoldText style={{ fontSize: 20, color: Colors[theme].text }}>
            Rental Information
          </ExtraBoldText>

          <View style={{ marginTop: 16, gap: 12 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="locate-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>
                Region of use: {capitalizeWords(params.data.regionOfUse)}
              </RegularText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="calendar-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>Start date: {params.data.startDate}</RegularText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="calendar-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>End date: {params.data.endDate}</RegularText>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors[theme].background,
            padding: 16,
            marginTop: 16,
            flex: 1,
          }}
        >
          <ExtraBoldText style={{ fontSize: 20, color: Colors[theme].text }}>
            Car Information
          </ExtraBoldText>

          <View style={{ marginTop: 16, gap: 12 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="car-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>
                {params.data.car.carBrand} {params.data.car.carModel}
              </RegularText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="hand-left-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>
                {capitalizeWords(params.data.car.carTransmission)}
              </RegularText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="cash-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>
                {params.data.car.dailyPrice} GHc per day
              </RegularText>
            </View>

            <View>
              <PrimaryButton
                title="Accept"
                onPress={() => handleRentalRequest("accepted")}
                style={{ backgroundColor: "limegreen" }}
              />
              <PrimaryButton
                title="Reject"
                onPress={() => handleRentalRequest("rejected")}
                style={{ backgroundColor: "crimson" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RentalDetails;
