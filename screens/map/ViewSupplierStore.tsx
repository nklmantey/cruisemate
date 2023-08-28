import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  BoldText,
  ExtraBoldText,
  MediumText,
  RegularText,
} from "../../components/StyledText";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Image } from "expo-image";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input } from "../../components/ui/Input";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { capitalizeWords } from "../../utils";
import { PrimaryButton } from "../../components/ui/Button";
import { RegionData } from "../../constants/regions";
import CustomDatePicker from "../../components/DatePicker";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";

type RouteParams = {
  params: {
    data: RentalSupplier;
  };
};

const ViewSupplierStore = () => {
  const { params }: RouteProp<RouteParams> = useRoute();
  const user = useUserAuthStore((state) => state.user);
  const theme = useColorScheme();
  const [shopName, setShopName] = useState(params.data.shopName);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [openStartDateModal, setOpenStartDateModal] = useState(false);
  const [openEndDateModal, setOpenEndDateModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<SupplierCar | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [driversLicenseUrl, setDriversLicenseUrl] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const { setOptions } = useNavigation();

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const RentalRequestBottomSheetRef = useRef<BottomSheet>(null);
  const RegionsBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "70%"], []);
  const regionsSnapPoints = useMemo(() => ["5%", "50%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.9}
        enableTouchThrough={false}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  const fetchSupplierUid = async () => {
    try {
      const q = query(
        collection(db, "rentalsuppliers"),
        where("email", "==", params.data.email)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSupplierId(doc.id);
      });
    } catch (error) {
      console.error("Error fetching user UID:", error);
    }
  };

  const getUserData = async () => {
    const userDocRef = doc(db, "uploads", `${user?.id}`);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      setDriversLicenseUrl(userDocSnap.data().userDriversLicenseUrl);
    } else {
      console.log("No such document");
    }
    return;
  };

  const makeRentalRequest = async () => {
    setLoading(true);

    try {
      await addDoc(collection(db, "requests"), {
        supplierId: supplierId,
        userId: user?.id,
        startDate: new Intl.DateTimeFormat("en-US", options).format(startDate),
        endDate: new Intl.DateTimeFormat("en-US", options).format(endDate),
        regionOfUse: selectedRegion,
        userDriversLicense: driversLicenseUrl,
        car: selectedCar,
        rentalAccepted: false,
      });
      setLoading(false);
      RentalRequestBottomSheetRef.current?.close();
      showMessage({
        message: "Rental request successfully made!",
        icon: "success",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOptions({
      title: shopName === "" ? "Supplier Store" : shopName,
    });
  }, [shopName]);

  useEffect(() => {
    fetchSupplierUid();
    getUserData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{ backgroundColor: Colors[theme].background, padding: 16 }}
        >
          <ExtraBoldText style={{ fontSize: 20, color: Colors[theme].text }}>
            Shop Information
          </ExtraBoldText>

          <View style={{ marginTop: 16, gap: 12 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="person-circle-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>{params.data.fullName}</RegularText>
            </View>

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="map-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>{params.data.fullName}</RegularText>
            </View>
          </View>
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

          <View style={{ marginTop: 16, gap: 12 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="call-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>{params.data.phone}</RegularText>
            </View>

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons
                name="mail-outline"
                size={15}
                color={Colors[theme].text}
              />
              <RegularText>{params.data.email}</RegularText>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors[theme].background,
            padding: 16,
            marginTop: 16,
          }}
        >
          <ExtraBoldText style={{ fontSize: 20, color: Colors[theme].text }}>
            Cars
          </ExtraBoldText>

          <View style={{ marginTop: 16, gap: 12 }}>
            <FlatList
              data={params.data.cars}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Rental Request",
                      "Do you want to rent the currently selected car?",
                      [
                        { text: "No" },
                        {
                          text: "Yes",
                          onPress: () => {
                            setSelectedCar(item);
                            RentalRequestBottomSheetRef.current?.snapToIndex(1);
                          },
                        },
                      ]
                    );
                  }}
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
                    source={{ uri: item.pictures[0] }}
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
                    {item.carBrand} {item.carModel}
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
                      GHC {item.dailyPrice}/day
                    </ExtraBoldText>

                    <View
                      style={{
                        backgroundColor:
                          item.carCondition === "excellent"
                            ? "limegreen"
                            : item.carCondition === "good"
                            ? "palegreen"
                            : item.carCondition === "fair"
                            ? "gold"
                            : "crimson",
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 100,
                      }}
                    >
                      <BoldText style={{ color: Colors[theme].text }}>
                        {item.carCondition === "excellent"
                          ? "Excellent condition"
                          : item.carCondition === "good"
                          ? "Good condition"
                          : item.carCondition === "fair"
                          ? "Fair condition"
                          : "Poor condition"}
                      </BoldText>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        ref={RentalRequestBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors[theme].background,
            paddingHorizontal: 16,
          }}
        >
          {selectedCar === null ? (
            <ActivityIndicator size={20} color={"black"} />
          ) : (
            <>
              <Input
                placeholder="Name"
                onChangeText={(e) => e}
                value={user?.name}
              />
              <Input
                placeholder="Number"
                onChangeText={(e) => e}
                value={user?.number}
              />

              <TouchableOpacity
                onPress={() => RegionsBottomSheetRef.current?.snapToIndex(1)}
                style={{
                  width: "100%",
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                  paddingVertical: 24,
                }}
              >
                {selectedRegion === "" ? (
                  <>
                    <MediumText
                      style={{ fontSize: 18, color: Colors[theme].gray }}
                    >
                      Select a region of use
                    </MediumText>
                    <Ionicons
                      name="locate-outline"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </>
                ) : (
                  <>
                    <MediumText style={{ fontSize: 18 }}>
                      {capitalizeWords(selectedRegion)}
                    </MediumText>
                    <Ionicons
                      name="locate-outline"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setOpenStartDateModal(true)}
                style={{
                  width: "100%",
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                  paddingVertical: 24,
                }}
              >
                {startDate === undefined ? (
                  <>
                    <MediumText
                      style={{ fontSize: 18, color: Colors[theme].gray }}
                    >
                      Select a start date
                    </MediumText>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </>
                ) : (
                  <>
                    <MediumText
                      style={{ fontSize: 18, color: Colors[theme].gray }}
                    >
                      {new Intl.DateTimeFormat("en-US", options).format(
                        startDate
                      )}
                    </MediumText>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setOpenEndDateModal(true)}
                style={{
                  width: "100%",
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                  paddingVertical: 24,
                }}
              >
                {endDate === undefined ? (
                  <>
                    <MediumText
                      style={{ fontSize: 18, color: Colors[theme].gray }}
                    >
                      Select an end date
                    </MediumText>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </>
                ) : (
                  <>
                    <MediumText
                      style={{ fontSize: 18, color: Colors[theme].gray }}
                    >
                      {new Intl.DateTimeFormat("en-US", options).format(
                        endDate
                      )}
                    </MediumText>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={Colors[theme].text}
                    />
                  </>
                )}
              </TouchableOpacity>

              {openStartDateModal && (
                <CustomDatePicker
                  date={startDate}
                  exitOnClose={(date) => setStartDate(date)}
                  onDateSelected={() => setOpenStartDateModal(false)}
                />
              )}

              {openEndDateModal && (
                <CustomDatePicker
                  date={endDate}
                  exitOnClose={(date) => setEndDate(date)}
                  onDateSelected={() => setOpenEndDateModal(false)}
                />
              )}

              <PrimaryButton
                title={
                  loading ? (
                    <ActivityIndicator
                      size={20}
                      color={Colors[theme].background}
                    />
                  ) : (
                    "Rent now"
                  )
                }
                onPress={makeRentalRequest}
              />
            </>
          )}
        </View>
      </BottomSheet>

      <BottomSheet
        ref={RegionsBottomSheetRef}
        index={-1}
        snapPoints={regionsSnapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
      >
        <FlatList
          data={RegionData}
          numColumns={2}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: Colors[theme].background,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <PrimaryButton
                title={capitalizeWords(item.region)}
                onPress={() => {
                  RegionsBottomSheetRef.current?.close();
                  setSelectedRegion(item.region);
                }}
                style={{
                  alignSelf: "flex-start",
                  width: "80%",
                }}
              />
            </View>
          )}
        />
      </BottomSheet>
    </View>
  );
};
export default ViewSupplierStore;
