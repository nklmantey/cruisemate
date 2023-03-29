import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import { Input, PwdInput } from "../../components/ui/Input";
import useColorScheme from "../../hooks/useColorScheme";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import { showMessage } from "react-native-flash-message";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useColorScheme();
  const { navigate }: any = useNavigation();

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
          onPress={() => {
            navigate("Home");
          }}
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
