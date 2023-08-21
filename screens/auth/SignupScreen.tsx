import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useMemo, useRef, useState } from "react";
import { ExtraBoldText, MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import { Input, PwdInput } from "../../components/ui/Input";
import useColorScheme from "../../hooks/useColorScheme";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { doc, setDoc } from "firebase/firestore";
import { Image } from "expo-image";
import {
  validateEmail,
  validateMatchPassword,
  validatePassword,
} from "../../utils";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountTypeSelected, setAccountTypeSelected] = useState(false);
  const [accountType, setAccountType] = useState<
    "renter" | "rentalsupplier" | ""
  >("");
  // const setIsOnboarded = useUserAuthStore((state) => state.setIsOnboarded)

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();

  const UserAccountBottomSheetRef = useRef<BottomSheet>(null);
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

  const addUserToDb = async (uid: string) => {
    if (accountType === "renter") {
      await setDoc(doc(db, "users", uid), {
        email: email.trim(),
        phone: phone,
        fullName: fullName,
      });
    } else if (accountType === "rentalsupplier") {
      await setDoc(doc(db, "rentalsuppliers", uid), {
        email: email.trim(),
        phone: phone,
        fullName: fullName,
      });
    }
  };

  const handleSignup = async () => {
    // input validation
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    phone === "" ||
    fullName === ""
      ? showMessage({
          message: "Please fill in all fields!",
          type: "danger",
          icon: "danger",
        })
      : validateEmail(email)
      ? validatePassword(password)
        ? validateMatchPassword(password, confirmPassword)
          ? await createAccount()
          : showMessage({
              message: "Your passwords do not match!",
              type: "danger",
              icon: "danger",
            })
        : showMessage({
            message: "Your password is less than 8 characters!",
            type: "danger",
            icon: "danger",
          })
      : showMessage({
          message: "Make sure your email is in the right format!",
          type: "danger",
          icon: "danger",
        });
  };

  const createAccount = async () => {
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password)
        .then(async (userCredential) => {
          await addUserToDb(userCredential?.user?.uid);
          showMessage({
            message: "Account successfully created!",
            type: "success",
            icon: "success",
          });

          if (accountType === "renter") {
            navigate("ProfileSetup", {
              uid: userCredential?.user?.uid,
            });
          } else if (accountType === "rentalsupplier") {
            navigate("SupplierProfileSetup", {
              uid: userCredential?.user?.uid,
            });
          }
        })
        .finally(() => {
          setEmail("");
          setPassword("");
          setFullName("");
          setPhone("");
        })
        .catch((error) => {
          console.log(error);
        });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
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
              source={require("../../assets/signup.svg")}
              style={{ width: 80, height: 80 }}
            />
            <ExtraBoldText style={{ fontSize: 28 }}>Sign up</ExtraBoldText>
          </View>

          <Input
            placeholder="Email"
            onChangeText={(e) => {
              setEmail(e);
            }}
          />
          <Input
            placeholder="Phone Number"
            maxLength={10}
            onChangeText={(e) => {
              setPhone(e);
            }}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Full name"
            onChangeText={(e) => {
              setFullName(e);
            }}
          />
          <PwdInput
            placeholder="Password"
            onChangeText={(e) => {
              setPassword(e);
            }}
          />
          <PwdInput
            placeholder="Confirm Password"
            onChangeText={(e) => {
              setConfirmPassword(e);
            }}
          />

          <TouchableOpacity
            onPress={() => UserAccountBottomSheetRef.current?.snapToIndex(1)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 24,
              width: "100%",
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {accountTypeSelected ? (
              <>
                <MediumText style={{ color: Colors[theme].gray, fontSize: 18 }}>
                  {accountType === "renter"
                    ? "I am a car renter"
                    : "I am a rental car supplier"}
                </MediumText>
                <Ionicons
                  name="person-circle-outline"
                  size={25}
                  color={Colors[theme].text}
                />
              </>
            ) : (
              <>
                <MediumText style={{ color: Colors[theme].gray, fontSize: 18 }}>
                  Select account type
                </MediumText>
                <Ionicons
                  name="person-circle-outline"
                  size={25}
                  color={Colors[theme].text}
                />
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%" }}>
          <PrimaryButton
            title={
              loading ? (
                <ActivityIndicator color={Colors[theme].background} />
              ) : (
                "Create account"
              )
            }
            onPress={handleSignup}
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
      </BottomSheet>
    </SafeAreaView>
  );
};

export default SignupScreen;
