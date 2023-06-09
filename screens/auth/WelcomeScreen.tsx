import { StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View } from "../../components/Themed";
import {
  BoldText,
  ExtraBoldText,
  MediumText,
} from "../../components/StyledText";
import { Image } from "expo-image";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";
import { FlatList } from "react-native-gesture-handler";
import { OnboardData } from "../../constants/Data";
import Onboarding from "../../components/Onboarding";
import DotView from "../../components/onboarding/DotView";

const WelcomeScreen = () => {
  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        snapToAlignment="end"
        contentContainerStyle={styles.onboardContainer}
        data={OnboardData}
        renderItem={({ item }) => <Onboarding {...item} />}
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{ width: "100%", paddingHorizontal: 24, paddingVertical: 32 }}
      >
        <PrimaryButton title="Get started" onPress={() => navigate("Signup")} />
        <SecondaryButton title="Log in" onPress={() => navigate("Login")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  onboardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
