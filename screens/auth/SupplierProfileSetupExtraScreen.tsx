import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  BoldText,
  ExtraBoldText,
  MediumText,
  RegularText,
} from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import useColorScheme from "../../hooks/useColorScheme";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { doc, setDoc } from "firebase/firestore";
import { Image } from "expo-image";
import { Input } from "../../components/ui/Input";
import { Ionicons } from "@expo/vector-icons";

const DriverProfileSetupScreen = () => {
  const [rentalSupplierShopName, setRentalSupplierShopName] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { params }: RouteProp<AuthStackParamList> = useRoute();

  const addSupplierInfoToDb = async (uid: string) => {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "users", uid),
        {
          shopName: rentalSupplierShopName,
        },
        { merge: true }
      );
      showMessage({
        message: "You're all set!",
        type: "success",
        icon: "success",
      });

      navigate("Login");
    } catch (e) {
      console.log(e);
    } finally {
      setRentalSupplierShopName("");
    }

    setLoading(false);
  };

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
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/profile.svg")}
              style={{ width: 80, height: 80 }}
            />
            <ExtraBoldText style={{ fontSize: 20 }}>
              Profile Setup - Supplier
            </ExtraBoldText>
          </View>

          <Input
            placeholder="What's the name of your rental shop?"
            onChangeText={(e) => {
              setRentalSupplierShopName(e);
            }}
          />

          {locationSelected ? (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 20,
                width: "100%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <MediumText style={{ color: Colors[theme].gray, fontSize: 18 }}>
                your shop location goes here
              </MediumText>
              <Ionicons name="location" size={25} color={Colors[theme].text} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 24,
                width: "100%",
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <MediumText style={{ color: Colors[theme].gray, fontSize: 18 }}>
                Select your shop location
              </MediumText>
              <Ionicons name="location" size={20} color={Colors[theme].text} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ width: "100%" }}>
          <PrimaryButton
            title={
              loading ? (
                <ActivityIndicator color={Colors[theme].background} />
              ) : (
                "Finish"
              )
            }
            onPress={() => params && addSupplierInfoToDb(params.uid)}
          />
          <View
            style={{
              flexDirection: "row",
              columnGap: 4,
              alignSelf: "center",
              marginVertical: 8,
            }}
          >
            <MediumText>Already have an account?</MediumText>
            <MediumText
              style={{
                textDecorationLine: "underline",
              }}
              onPress={() => navigate("Login")}
            >
              Head to login
            </MediumText>
          </View>
        </View>
      </View>

      {/* <BottomSheet
        ref={UserAccountBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].background,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            paddingHorizontal: 30,
          }}
        >
          <PrimaryButton
            title="Rental Supplier"
            onPress={() => {
              setAccountTypeSelected(true);
              setAccountType("rentalsupplier");
              UserAccountBottomSheetRef.current?.close();
            }}
            style={{ backgroundColor: Colors[theme].text }}
          />
          <PrimaryButton
            onPress={() => {
              setAccountTypeSelected(true);
              setAccountType("renter");
              UserAccountBottomSheetRef.current?.close();
            }}
            title="Renter"
            style={{ backgroundColor: Colors[theme].text }}
          />
        </View>
      </BottomSheet> */}
    </SafeAreaView>
  );
};

export default DriverProfileSetupScreen;
