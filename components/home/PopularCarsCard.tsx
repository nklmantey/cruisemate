import { View, Text } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, MediumText } from "../StyledText";

const PricePerDay = ({ price }: { price: string }) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        padding: 8,
        width: "30%",
        marginVertical: 4,
        borderRadius: 5,
        backgroundColor: Colors[theme].text,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MediumText style={{ color: Colors[theme].background }}>
        ${price} per day
      </MediumText>
    </View>
  );
};

const PopularCarsCard = () => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: Colors[theme].grayLight,
        padding: 16,
        height: 300,
        borderRadius: 20,
        justifyContent: "space-between",
      }}
    >
      <Text>PopularCarsCard</Text>
      <View
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: Colors[theme].text,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
        }}
      >
        <Ionicons
          name="arrow-forward"
          color={Colors[theme].background}
          size={25}
        />
      </View>

      <View>
        <BoldText>BMW X5</BoldText>
        <PricePerDay price="10" />
      </View>
    </View>
  );
};

export default PopularCarsCard;
