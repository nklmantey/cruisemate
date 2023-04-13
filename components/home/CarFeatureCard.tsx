import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MediumText } from "../StyledText";
import { View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";

const CarFeatureCard = () => {
  const theme = useColorScheme();

  return (
    <View style={{ marginVertical: 8, justifyContent: "center", gap: 5 }}>
      <View
        style={{
          backgroundColor: Colors[theme].text,
          padding: 2,
          width: 40,
          height: 40,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="battery-charging"
          color={Colors[theme].background}
          size={20}
        />
      </View>
      <MediumText style={{ color: Colors[theme].text }}>Electric</MediumText>
    </View>
  );
};

export default CarFeatureCard;
