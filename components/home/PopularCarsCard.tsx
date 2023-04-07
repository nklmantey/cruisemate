import { View, Text } from "../Themed";
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

const PopularCarsCard = ({ name, price }: { name: string; price: string }) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        backgroundColor: Colors[theme].grayLight,
        padding: 16,
        height: 250,
        borderRadius: 16,
        justifyContent: "space-between",
        marginVertical: 8,
      }}
    >
      <Text>PopularCarsCard</Text>

      <View>
        <BoldText style={{ color: Colors[theme].background }}>{name}</BoldText>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PricePerDay price={price} />
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors[theme].text,
            }}
          >
            <Ionicons
              name="arrow-forward"
              color={Colors[theme].background}
              size={20}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PopularCarsCard;
