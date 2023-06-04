import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState } from "react";
import { MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import { Input, PwdInput } from "../../components/ui/Input";
import useColorScheme from "../../hooks/useColorScheme";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { showMessage } from "react-native-flash-message";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

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
          setIsLoggedIn(true);
        })
        .catch((error) => {
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
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
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser({
        email: user.email!,
        id: user.uid,
        name: docSnap.data().fullName,
        number: docSnap.data().phone,
        avatar: docSnap.data().avatar_url,
      });
    } else {
      console.log("No such document");
    }
    return;
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
  );
};

export default LoginScreen;
