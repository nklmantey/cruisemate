import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import { Input, PwdInput } from "../../components/ui/Input";
import useColorScheme from "../../hooks/useColorScheme";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { showMessage } from "react-native-flash-message";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { params }: any = useRoute();

  const theme = useColorScheme();
  const { navigate }: any = useNavigation();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser({
            email: user.email,
            id: user.uid,
            name: params?.fullName,
            number: params?.phone,
          });
          showMessage({
            message: "Success!",
            type: "success",
            icon: "success",
          });
          setIsLoggedIn(true);
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
    <View
      style={{
        padding: 16,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <MediumText style={{ textAlign: "center" }}>
          Enter your credentials to log in.
        </MediumText>
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
        <MediumText style={{ textAlign: "right", marginVertical: 8 }}>
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
          onPress={() => handleLogin()}
        />
        <SecondaryButton
          title="Log in with Google"
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
  );
};

export default LoginScreen;
