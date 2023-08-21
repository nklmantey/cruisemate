import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
} from "react-native";
import Colors from "../../constants/Colors";
import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { showMessage } from "react-native-flash-message";
import { doc, getDoc } from "firebase/firestore";
import { Image } from "expo-image";
import { useSupplierAuthStore } from "../../store/useSupplierAuthStore";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const setUser = useUserAuthStore((state) => state.setUser);
  const setIsLoggedIn = useUserAuthStore((state) => state.setIsLoggedIn);
  const setIsSupplierLoggedIn = useSupplierAuthStore(
    (state) => state.setIsSupplierLoggedIn
  );

  const handleLogin = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await getUserData(user);

          showMessage({
            message: "Success!",
            type: "success",
            icon: "success",
          });
        })
        .catch((error) => {
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found" ||
            error.code === "auth/invalid-email"
          ) {
            showMessage({
              message: "Invalid credentials, try again !",
              type: "danger",
              icon: "danger",
            });
          }
          console.log(error);
        });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserData = async (user: User) => {
    const userDocRef = doc(db, "users", user.uid);
    const supplierDocRef = doc(db, "rentalsuppliers", user.uid);

    const userDocSnap = await getDoc(userDocRef);
    const supplierDocSnap = await getDoc(supplierDocRef);

    if (userDocSnap.exists()) {
      setUser({
        email: user.email!,
        id: user.uid,
        name: userDocSnap.data().fullName,
        number: userDocSnap.data().phone,
      });
      setIsLoggedIn(true);
    } else if (supplierDocSnap.exists()) {
      setUser({
        email: user.email!,
        id: user.uid,
        name: supplierDocSnap.data().fullName,
        number: supplierDocSnap.data().phone,
      });
      setIsSupplierLoggedIn(true);
    } else {
      console.log("No such document");
    }
    return;
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
              source={require("../../assets/login.svg")}
              style={{ width: 80, height: 80 }}
            />
            <ExtraBoldText style={{ fontSize: 28 }}>Login</ExtraBoldText>
          </View>

          <Input
            placeholder="Email"
            onChangeText={(e) => {
              setEmail(e);
            }}
          />
          <PwdInput
            placeholder="Password"
            onChangeText={(e) => {
              setPassword(e);
            }}
          />
          <MediumText
            style={{ textAlign: "left", marginTop: 24, marginLeft: 12 }}
          >
            Forgot your password?
          </MediumText>
        </View>

        <View style={{ width: "100%" }}>
          <PrimaryButton
            title={
              loading ? (
                <ActivityIndicator color={Colors[theme].background} />
              ) : (
                "Log in"
              )
            }
            onPress={handleLogin}
          />
          <View
            style={{
              flexDirection: "row",
              columnGap: 4,
              alignSelf: "center",
              marginVertical: 8,
            }}
          >
            <MediumText>Don't have an account?</MediumText>
            <MediumText
              style={{
                textDecorationLine: "underline",
              }}
              onPress={() => navigate("Signup")}
            >
              Create one now
            </MediumText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
