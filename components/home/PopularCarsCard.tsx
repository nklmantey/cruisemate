import { View } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { BoldText, MediumText } from "../StyledText";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PricePerDay = ({ price }: { price: string }) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        padding: 8,
        width: "40%",
        borderRadius: 8,
        backgroundColor: Colors[theme].background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MediumText style={{ color: Colors[theme].text }}>
        ${price} per day
      </MediumText>
    </View>
  );
};

const PopularCarsCard = ({
  name,
  price,
}: // onPress,
{
  name: string;
  price: string;
  // onPress(): void;
}) => {
  const theme = useColorScheme();
  const { navigate }: any = useNavigation();
  const IMAGE_URI =
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

  return (
    <TouchableOpacity
      onPress={() =>
        navigate("CarDetails", {
          source: IMAGE_URI,
          name: name,
        })
      }
      style={{
        backgroundColor: Colors[theme].grayLight,
        padding: 8,
        height: 250,
        borderRadius: 16,
        marginVertical: 8,
        gap: 10,
      }}
    >
      <Image
        contentFit="cover"
        transition={1000}
        source={{
          uri: IMAGE_URI,
        }}
        style={{ width: "100%", height: "75%", borderRadius: 15 }}
      />
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <PricePerDay price={price} />
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              alignItems: "center",
            }}
          >
            <BoldText style={{ color: Colors[theme].background }}>
              {name}
            </BoldText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularCarsCard;
