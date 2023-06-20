import { StyleSheet } from "react-native";
import { ExtraBoldText, MediumText } from "./StyledText";
import { View } from "./Themed";
import { screenWidth } from "../constants/Dimensions";
import DotView from "./onboarding/DotView";
import { Image } from "expo-image";

const Onboarding = ({ id, title }: OnboardDataType) => {
  return (
    <View style={styles.container}>
      {id === 0 ? (
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 120, height: 120, borderRadius: 20 }}
        />
      ) : id === 1 ? (
        <Image
          source={require("../assets/find.svg")}
          style={{ width: 120, height: 120 }}
        />
      ) : id === 2 ? (
        <Image
          source={require("../assets/track.svg")}
          style={{ width: 120, height: 120 }}
        />
      ) : (
        <Image
          source={require("../assets/geofence.svg")}
          style={{ width: 120, height: 120 }}
        />
      )}

      <ExtraBoldText style={{ fontSize: 24, textAlign: "center" }}>
        {title}
      </ExtraBoldText>

      <DotView id={id} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    maxWidth: screenWidth,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 20,
  },
});

export default Onboarding;
