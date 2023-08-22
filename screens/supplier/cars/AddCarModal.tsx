import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Colors from "../../../constants/Colors";
import { MediumText, RegularText } from "../../../components/StyledText";
import ImageUpload from "../../../components/ImageUpload";
import { Input } from "../../../components/ui/Input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useColorScheme from "../../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "../../../components/Themed";
import { PrimaryButton } from "../../../components/ui/Button";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../config/firebase";
import { useSupplierAuthStore } from "../../../store/useSupplierAuthStore";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const AddCarModal = () => {
  const theme = useColorScheme();
  const { navigate }: NavigationProp<SupplierCarsParamList> = useNavigation();
  const supplier = useSupplierAuthStore((state) => state.supplier);
  const [carModel, setCarModel] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carCondition, setCarCondition] = useState<
    "excellent" | "good" | "fair" | "poor" | ""
  >("");
  const [loading, setLoading] = useState(false);

  const [carImageOne, setCarImageOne] = useState("");
  const [carImageOneUrl, setCarImageOneUrl] = useState("");
  const [carImageOneUploadProgress, setCarImageOneUploadProgress] =
    useState("");

  const [carImageTwo, setCarImageTwo] = useState("");
  const [carImageTwoUrl, setCarImageTwoUrl] = useState("");
  const [carImageTwoUploadProgress, setCarImageTwoUploadProgress] =
    useState("");

  const [carImageThree, setCarImageThree] = useState("");
  const [carImageThreeUrl, setCarImageThreeUrl] = useState("");
  const [carImageThreeUploadProgress, setCarImageThreeUploadProgress] =
    useState("");

  const carName = `${carBrand}${carModel}`;

  useEffect(() => {
    async function startUploadImageOne() {
      if (carImageOne !== "") {
        await handleImageOneUpload(carImageOne);
      }
      return;
    }

    startUploadImageOne();
  }, [carImageOne]);

  useEffect(() => {
    async function startUploadImageTwo() {
      if (carImageTwo !== "") {
        await handleImageTwoUpload(carImageTwo);
      }
      return;
    }

    startUploadImageTwo();
  }, [carImageTwo]);

  useEffect(() => {
    async function startUploadImageThree() {
      if (carImageThree !== "") {
        await handleImageThreeUpload(carImageThree);
      }
      return;
    }

    startUploadImageThree();
  }, [carImageThree]);

  async function selectImageFromGallery(id: number) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.2,
    });

    if (!result.canceled) {
      if (id === 1) {
        setCarImageOne(result.assets[0].uri);
      } else if (id === 2) {
        setCarImageTwo(result.assets[0].uri);
      } else {
        setCarImageThree(result.assets[0].uri);
      }

      return;
    }
  }

  async function handleImageOneUpload(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `cars/${supplier?.id}/${carName}/1`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCarImageOneUploadProgress(progress.toFixed());
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setCarImageOneUrl(downloadURL);
        });
      }
    );
  }

  async function handleImageTwoUpload(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `cars/${supplier?.id}/${carName}/2`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCarImageTwoUploadProgress(progress.toFixed());
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setCarImageTwoUrl(downloadURL);
        });
      }
    );
  }

  async function handleImageThreeUpload(uri: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `cars/${supplier?.id}/${carName}/3`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCarImageThreeUploadProgress(progress.toFixed());
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setCarImageThreeUrl(downloadURL);
        });
      }
    );
  }

  const addCarToDb = async (uid: string) => {
    setLoading(true);

    const docRef = doc(db, "rentalsuppliers", uid);
    const newCar = {
      carBrand: carBrand,
      carModel: carModel,
      carCondition: carCondition,
      pictures: [carImageOneUrl, carImageTwoUrl, carImageThreeUrl],
      rentalStatus: false,
    };

    try {
      await updateDoc(docRef, {
        cars: arrayUnion(newCar),
      });
      showMessage({
        message: "Car added successfully!",
        type: "success",
        icon: "success",
      });

      navigate("Cars");
    } catch (e) {
      console.log(e);
      showMessage({
        message: "Failed to add car!",
        type: "danger",
        icon: "danger",
      });
    } finally {
      setCarBrand("");
      setCarModel("");
      setCarCondition("");
    }

    setLoading(false);
  };

  const ConditionBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "20%"], []);

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, padding: 16 }}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <View>
        <Input placeholder="Car brand" onChangeText={(e) => setCarBrand(e)} />
        <Input placeholder="Car model" onChangeText={(e) => setCarModel(e)} />
      </View>

      <View style={{ marginTop: 16, gap: 20 }}>
        {carImageOne === "" ? (
          <ImageUpload
            uploadText="Upload first car image"
            onPress={() => selectImageFromGallery(1)}
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => selectImageFromGallery(1)}>
              <Image
                style={{
                  aspectRatio: 16 / 9,
                  borderRadius: 10,
                }}
                source={{ uri: carImageOne }}
                contentPosition="center"
                contentFit="cover"
              />
            </TouchableOpacity>
            {carImageOneUploadProgress === "100" ? (
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

        {carImageTwo === "" ? (
          <ImageUpload
            uploadText="Upload second car image"
            onPress={() => selectImageFromGallery(2)}
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => selectImageFromGallery(2)}>
              <Image
                style={{
                  aspectRatio: 16 / 9,
                  borderRadius: 10,
                }}
                source={{ uri: carImageTwo }}
                contentPosition="center"
                contentFit="cover"
              />
            </TouchableOpacity>
            {carImageTwoUploadProgress === "100" ? (
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

        {carImageThree === "" ? (
          <ImageUpload
            uploadText="Upload third car image"
            onPress={() => selectImageFromGallery(3)}
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => selectImageFromGallery(3)}>
              <Image
                style={{
                  aspectRatio: 16 / 9,
                  borderRadius: 10,
                }}
                source={{ uri: carImageThree }}
                contentPosition="center"
                contentFit="cover"
              />
            </TouchableOpacity>
            {carImageThreeUploadProgress === "100" ? (
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
        <TouchableOpacity
          onPress={() => ConditionBottomSheetRef.current?.snapToIndex(1)}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 24,
            width: "100%",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {carCondition !== "" ? (
            <>
              <MediumText style={{ color: Colors[theme].gray, fontSize: 18 }}>
                {carCondition.charAt(0).toUpperCase()}
                {carCondition.slice(1)}
              </MediumText>
              <Ionicons
                name="car-outline"
                size={25}
                color={Colors[theme].text}
              />
            </>
          ) : (
            <>
              <MediumText style={{ color: Colors[theme].gray, fontSize: 18 }}>
                Select car condition
              </MediumText>
              <Ionicons
                name="car-outline"
                size={25}
                color={Colors[theme].text}
              />
            </>
          )}
        </TouchableOpacity>
      </View>

      <PrimaryButton
        title="Add car"
        onPress={() => addCarToDb(supplier?.id!)}
      />

      <BottomSheet
        ref={ConditionBottomSheetRef}
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
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 10,
            paddingHorizontal: 30,
          }}
        >
          <PrimaryButton
            title="Excellent"
            onPress={() => {
              ConditionBottomSheetRef.current?.close();
              setCarCondition("excellent");
            }}
            style={{
              alignSelf: "flex-start",
              width: "45%",
              backgroundColor: "limegreen",
            }}
          />
          <PrimaryButton
            title="Good"
            onPress={() => {
              ConditionBottomSheetRef.current?.close();
              setCarCondition("good");
            }}
            style={{
              alignSelf: "flex-start",
              width: "45%",
              backgroundColor: "palegreen",
            }}
          />
          <PrimaryButton
            title="Fair"
            onPress={() => {
              ConditionBottomSheetRef.current?.close();
              setCarCondition("fair");
            }}
            style={{
              alignSelf: "flex-start",
              width: "45%",
              backgroundColor: "lemonchiffon",
            }}
          />
          <PrimaryButton
            title="Poor"
            onPress={() => {
              ConditionBottomSheetRef.current?.close();
              setCarCondition("poor");
            }}
            style={{
              alignSelf: "flex-start",
              width: "45%",
              backgroundColor: "indianred",
            }}
          />
        </View>
      </BottomSheet>
    </ScrollView>
  );
};
export default AddCarModal;
