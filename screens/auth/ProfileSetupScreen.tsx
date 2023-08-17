import {
  NavigationProp,
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
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import ImageUpload from "../../components/ImageUpload";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type ImageUploadTypes = {
  type: "idCard" | "driversLicense";
};

const ProfileSetupScreen = () => {
  const [userIdCard, setUserIdCard] = useState("");
  const [userDriversLicense, setUserDriversLicense] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { params } = useRoute();

  const IdBottomSheetRef = useRef<BottomSheet>(null);
  const DriversLicenseBottomSheetRef = useRef<BottomSheet>(null);
  const AvatarBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "25%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.4}
        enableTouchThrough={false}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  async function selectImageFromGallery(imageType: ImageUploadTypes) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      if (imageType.type === "idCard") {
        setUserIdCard(result.assets[0].uri);
      }

      if (imageType.type === "driversLicense") {
        setUserDriversLicense(result.assets[0].uri);
      }
    }
  }

  const addUserProfileInfoToDb = async (uid: string) => {
    setLoading(true);

    try {
      await setDoc(
        doc(db, "users", uid),
        {
          idCard: userIdCard,
          driversLicense: userDriversLicense,
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
      setUserDriversLicense("");
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
            <ExtraBoldText style={{ fontSize: 28 }}>
              Profile Setup
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
            )}

            {userDriversLicense === "" ? (
              <ImageUpload
                uploadText="Upload a valid driver's license"
                onPress={() =>
                  DriversLicenseBottomSheetRef.current?.snapToIndex(1)
                }
              />
            ) : (
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
            onPress={() => addUserProfileInfoToDb(params?.uid)}
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
