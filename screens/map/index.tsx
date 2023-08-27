import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { ExtraBoldText } from "../../components/StyledText";
import { PrimaryButton } from "../../components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const MapScreen = () => {
  const { navigate }: NavigationProp<MapStackParamList> = useNavigation();
  const user = useUserAuthStore((state) => state.user);
  const [rentalSuppliers, setRentalSuppliers] = useState<RentalSupplier[]>([]);
  const [selectedRentalSupplier, setSelectedRentalSupplier] =
    useState<RentalSupplier>();

  const SupplierBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "40%"], []);
  const theme = useColorScheme();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        enableTouchThrough={false}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  async function fetchRentalSuppliers() {
    try {
      const querySnapshot = await getDocs(collection(db, "rentalsuppliers"));
      const fetchedSuppliers: RentalSupplier[] = querySnapshot.docs.map(
        (doc) => doc.data() as RentalSupplier
      );

      setRentalSuppliers(fetchedSuppliers);
    } catch (error) {
      showMessage({
        message: "Error fetching rental suppliers:",
        type: "danger",
        icon: "danger",
      });
      console.log(error);
    }
  }

  const makePhoneCall = (phoneNumber: string) => {
    const phoneNumberToCall = `tel:${phoneNumber}`;

    Linking.openURL(phoneNumberToCall).catch((error) =>
      console.error("Error opening phone app:", error)
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchRentalSuppliers();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: user?.location?.lat!,
          longitude: user?.location?.lng!,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {rentalSuppliers.length > 0 &&
          rentalSuppliers.map((rs: RentalSupplier) => (
            <Marker
              key={rs.email}
              onPress={() => {
                setSelectedRentalSupplier(rs);
                SupplierBottomSheetRef.current?.snapToIndex(1);
              }}
              coordinate={{
                latitude: rs.shopLocation.latitude,
                longitude: rs.shopLocation.longitude,
              }}
            />
          ))}
      </MapView>

      <BottomSheet
        ref={SupplierBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
      >
        <View
          style={{
            flex: 1,
            padding: 16,
          }}
        >
          {selectedRentalSupplier ? (
            <>
              <ExtraBoldText style={{ fontSize: 20 }}>
                {selectedRentalSupplier.shopName}
              </ExtraBoldText>

              <FlatList
                data={selectedRentalSupplier.cars[1].pictures}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 16 }}
                contentContainerStyle={{
                  gap: 10,
                  // backgroundColor: "red",
                  width: "100%",
                  alignSelf: "flex-start",
                  justifyContent: "space-between",
                }}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                )}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: 16,
                }}
                contentContainerStyle={{
                  alignSelf: "flex-start",
                  gap: 8,
                }}
              >
                <PrimaryButton
                  title="View store"
                  onPress={() =>
                    navigate("ViewSupplierStore", {
                      data: selectedRentalSupplier,
                    })
                  }
                  leftIcon={
                    <Ionicons
                      name="car-outline"
                      size={20}
                      color={Colors[theme].background}
                    />
                  }
                  style={{ width: 150 }}
                />
                <PrimaryButton
                  title="Call"
                  onPress={() => makePhoneCall(selectedRentalSupplier.phone)}
                  leftIcon={
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color={Colors[theme].background}
                    />
                  }
                  style={{ width: 150 }}
                />
                <PrimaryButton
                  title="Directions"
                  onPress={() => {}}
                  leftIcon={
                    <Ionicons
                      name="navigate-circle-outline"
                      size={20}
                      color={Colors[theme].background}
                    />
                  }
                  style={{ width: 150 }}
                />
              </ScrollView>
            </>
          ) : (
            <ActivityIndicator color={"red"} />
          )}
        </View>
      </BottomSheet>
    </View>
  );
};
export default MapScreen;
