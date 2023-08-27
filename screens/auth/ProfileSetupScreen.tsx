import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { db, storage } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { doc, setDoc } from "firebase/firestore";
import { Image } from "expo-image";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import ImageUpload from "../../components/ImageUpload";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

type ImageUploadTypes = {
  type: "idCard" | "driversLicense";
};

const ProfileSetupScreen = () => {
  const [userIdCard, setUserIdCard] = useState("");
  const [userIdCardUrl, setUserIdCardUrl] = useState("");
  const [userIdCardCreatedAt, setUserIdCardCreatedAt] = useState("");
  const [userIdCardUploadProgress, setUserIdCardUploadProgress] = useState("");
  const [userDriversLicense, setUserDriversLicense] = useState("");
  const [userDriversLicenseUrl, setUserDriversLicenseUrl] = useState("");
  const [userDriversLicenseCreatedAt, setUserDriversLicenseCreatedAt] =
    useState("");
  const [
    userDriversLicenseUploadProgress,
    setUserDriversLicenseUploadProgress,
  ] = useState("");
  const [loading, setLoading] = useState(false);

  async function selectImageFromGallery(imageType: ImageUploadTypes) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.2,
    });

    if (!result.canceled) {
      if (imageType.type === "idCard") {
        setUserIdCard(result.assets[0].uri);
        IdBottomSheetRef.current?.close();
      } else if (imageType.type === "driversLicense") {
        setUserDriversLicense(result.assets[0].uri);
        DriversLicenseBottomSheetRef.current?.close();
      } else return;
    }
  }

  async function uploadId(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "ids/" + params?.uid);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUserIdCardUploadProgress(progress.toFixed());
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setUserIdCardUrl(downloadURL);
          setUserIdCardCreatedAt(new Date().toISOString());
        });
      }
    );
  }

  async function uploadLicense(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "licenses/" + params?.uid);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUserDriversLicenseUploadProgress(progress.toFixed());
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setUserDriversLicenseUrl(downloadURL);
          setUserDriversLicenseCreatedAt(new Date().toISOString());
        });
      }
    );
  }

  const addUserProfileInfoToDb = async (uid: string) => {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "uploads", uid),
        {
          userIdCardUrl: userIdCardUrl,
          userIdCardCreatedAt: userIdCardCreatedAt,
          userDriversLicenseUrl: userDriversLicenseUrl,
          userDriversLicenseCreatedAt: userDriversLicenseCreatedAt,
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
      showMessage({ message: "Failed to upload documents" });
    } finally {
      setUserIdCard("");
      setUserIdCardUrl("");
      setUserIdCardCreatedAt("");
      setUserDriversLicense("");
      setUserDriversLicenseUrl("");
      setUserDriversLicenseCreatedAt("");
    }

    setLoading(false);
  };

  useEffect(() => {
    setUserIdCard("");
    setUserIdCardUrl("");
    setUserIdCardCreatedAt("");
    setUserDriversLicense("");
    setUserDriversLicenseUrl("");
    setUserDriversLicenseCreatedAt("");
  }, []);

  useEffect(() => {
    async function startUploadId() {
      if (userIdCard !== "") {
        await uploadId(userIdCard);
      }
      return;
    }

    startUploadId();
  }, [userIdCard]);

  useEffect(() => {
    async function startUploadLicense() {
      if (userDriversLicense !== "") {
        await uploadLicense(userDriversLicense);
      }
      return;
    }

    startUploadLicense();
  }, [userDriversLicense]);

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { params }: RouteProp<AuthStackParamList> = useRoute();

  const IdBottomSheetRef = useRef<BottomSheet>(null);
  const DriversLicenseBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "25%"], []);

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
              Profile Setup - User
            </ExtraBoldText>
          </View>

          <RegularText>
            The following images are required to verify your account
          </RegularText>

          <View style={{ marginTop: 40, gap: 20 }}>
            {userIdCard === "" ? (
              <ImageUpload
                uploadText="Upload a valid national ID card"
                onPress={() => IdBottomSheetRef.current?.snapToIndex(1)}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => IdBottomSheetRef.current?.snapToIndex(1)}
                >
                  <Image
                    style={{
                      aspectRatio: 16 / 9,
                      borderRadius: 10,
                    }}
                    source={{ uri: userIdCard }}
                    contentPosition="center"
                    contentFit="cover"
                  />
                </TouchableOpacity>
                {userIdCardUploadProgress === "100" ? (
                  <RegularText style={{ alignSelf: "center" }}>
                    Uploaded ✅
                  </RegularText>
                ) : (
                  <View style={{ alignSelf: "center" }}>
                    <ActivityIndicator color={Colors[theme].text} />
                  </View>
                )}
              </>
            )}

            {userDriversLicense === "" ? (
              <ImageUpload
                uploadText="Upload a valid driver's license"
                onPress={() =>
                  DriversLicenseBottomSheetRef.current?.snapToIndex(1)
                }
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    DriversLicenseBottomSheetRef.current?.snapToIndex(1)
                  }
                >
                  <Image
                    style={{
                      aspectRatio: 16 / 9,
                      borderRadius: 10,
                    }}
                    source={{ uri: userDriversLicense }}
                    contentPosition="center"
                    contentFit="cover"
                  />
                </TouchableOpacity>
                {userDriversLicenseUploadProgress === "100" ? (
                  <RegularText style={{ alignSelf: "center" }}>
                    Uploaded ✅
                  </RegularText>
                ) : (
                  <View style={{ alignSelf: "center" }}>
                    <ActivityIndicator color={Colors[theme].text} />
                  </View>
                )}
              </>
            )}
          </View>
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
            onPress={() => params && addUserProfileInfoToDb(params.uid)}
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

      <BottomSheet
        ref={IdBottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            paddingHorizontal: 30,
          }}
        >
          <PrimaryButton
            title="Take a picture"
            onPress={() => {}}
            style={{ backgroundColor: Colors[theme].text }}
          />
          <PrimaryButton
            title="Choose from gallery"
            onPress={() => selectImageFromGallery({ type: "idCard" })}
            style={{ backgroundColor: Colors[theme].text }}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        ref={DriversLicenseBottomSheetRef}
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
            gap: 15,
            paddingHorizontal: 30,
          }}
        >
          <PrimaryButton
            title="Take a picture"
            onPress={() => {}}
            style={{ backgroundColor: Colors[theme].text }}
          />
          <PrimaryButton
            title="Choose from gallery"
            onPress={() => selectImageFromGallery({ type: "driversLicense" })}
            style={{ backgroundColor: Colors[theme].text }}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ProfileSetupScreen;
