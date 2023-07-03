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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { doc, setDoc } from "firebase/firestore";
import { Image } from "expo-image";

const SignupScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();

  const addUserToDb = async (uid: string) => {
    await setDoc(doc(db, "users", uid), {
      email: email.trim(),
      phone: phone,
      fullName: fullName,
    });
  };

  const handleSignup = async () => {
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

          navigate("Login");
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
          paddingVertical: 24,
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
    </SafeAreaView>
  );
};

export default SignupScreen;
