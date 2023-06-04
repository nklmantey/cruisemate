import { ImageBackground, StyleSheet } from "react-native";
import HeroBg from "../../assets/hero-bg.jpg";
import WelcomeBg from "../../assets/welcome-bg.jpg";
import { BoldText, MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { PrimaryButton } from "../../components/ui/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={HeroBg}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <View style={styles.buttonContainer}>
          <PrimaryButton
            onPress={() => {}}
            textStyle={{ color: "black" }}
            style={{ backgroundColor: "white" }}
            title="Sign up as a user"
          />
          <PrimaryButton
            onPress={() => {}}
            textStyle={{ color: "black" }}
            style={{ backgroundColor: "white" }}
            title="Sign up as a dealer"
          />
          <View style={styles.navTextContainer}>
            <MediumText style={styles.navText}>
              Already have an account?
            </MediumText>
            <MediumText
              style={[styles.navText, { textDecorationLine: "underline" }]}
              onPress={() => navigate("Login")}
            >
              Head to login
            </MediumText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    margin: 16,
  },
  navTextContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    columnGap: 4,
    alignSelf: "center",
    marginVertical: 8,
  },
  navText: {
    color: "white",
  },
});

export default WelcomeScreen;
