import { View } from "../Themed";
import { BoldText } from "../StyledText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const NearbyCard = () => {
  const theme = useColorScheme();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        zIndex: 99,
        backgroundColor: Colors[theme].text,
        marginHorizontal: 20,
        width: "65%",
        height: 200,
        borderRadius: 16,
        padding: 8,
      }}
    >
      <Image
        style={{ width: "100%", height: 80, borderRadius: 8 }}
        source={blurhash}
        contentFit="cover"
        transition={1000}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <BoldText
            style={{
              color: Colors[theme].background,
              marginTop: 4,
            }}
          >
            Sport Coupe Car
          </BoldText>
          <View
            style={{
              flexDirection: "row",
              columnGap: 5,
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Ionicons name="star" color="yellow" size={16} />
            <BoldText style={{ color: Colors[theme].background, fontSize: 12 }}>
              4.9
            </BoldText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BoldText style={{ color: Colors[theme].background }}>$100</BoldText>
          <BoldText style={{ color: Colors[theme].gray }}>/day</BoldText>
        </View>
      </View>

      <View
        style={{
          marginTop: 16,
          width: "100%",
          height: 1,
          backgroundColor: Colors[theme].gray,
        }}
      />

      <View></View>
    </View>
  );
};

export default NearbyCard;
