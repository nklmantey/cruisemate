import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import { Input, PwdInput } from "../../components/ui/Input";
import useColorScheme from "../../hooks/useColorScheme";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { collection, doc, setDoc } from "firebase/firestore";

const SignupScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const { navigate }: any = useNavigation();

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

  const addUserToDb = async (uid: string) => {
    await setDoc(doc(db, "users", uid), {
      email: email.trim(),
      phone: phone,
      fullName: fullName,
    });
  };

  return (
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
        <MediumText style={{ textAlign: "center" }}>
          Enter your credentials to sign up.
        </MediumText>
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
          onPress={() => {
            handleSignup();
            // addUserToDb();
          }}
        />
        <SecondaryButton
          title="Sign up with Google"
          // onPress={() => navigate("Login")}
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
  );
};

export default SignupScreen;
