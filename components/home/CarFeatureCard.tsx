import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { MediumText } from "../StyledText";
import { View } from "../Themed";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

const CarFeatureCard = () => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View style={{ gap: 4, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: Colors[theme].text,
            padding: 2,
            width: 40,
            height: 40,
            borderRadius: 8,
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
      <View style={{ gap: 3, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: Colors[theme].text,
            padding: 2,
            width: 40,
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="car-door"
            color={Colors[theme].background}
            size={20}
          />
        </View>
        <MediumText style={{ color: Colors[theme].text }}>4 doors</MediumText>
      </View>
      <View style={{ gap: 3, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: Colors[theme].text,
            padding: 2,
            width: 40,
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="speedometer"
            color={Colors[theme].background}
            size={20}
          />
        </View>
        <MediumText style={{ color: Colors[theme].text }}>240 m</MediumText>
      </View>
      <View style={{ gap: 3, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: Colors[theme].text,
            padding: 2,
            width: 40,
            height: 40,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fontisto
            name="automobile"
            color={Colors[theme].background}
            size={20}
          />
        </View>
        <MediumText style={{ color: Colors[theme].text }}>Automatic</MediumText>
      </View>
    </View>
  );
};

export default CarFeatureCard;
