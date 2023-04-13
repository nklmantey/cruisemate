import { useNavigation, useRoute } from "@react-navigation/native";
import { BoldText, MediumText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { Image } from "expo-image";
import CarFeatureCard from "../../components/home/CarFeatureCard";

const CarDetails = () => {
  const theme = useColorScheme();
  const { params }: any = useRoute();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: Colors[theme].background,
      }}
    >
      <Image
        contentFit="cover"
        transition={1000}
        source={{
          uri: params.source,
        }}
        style={{ width: "100%", height: 250, borderRadius: 25 }}
      />

      <View style={{ flex: 1, paddingTop: 16 }}>
        <BoldText>{params?.name}</BoldText>

        <View
          style={{
            marginTop: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Colors[theme].gray,
            padding: 8,
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 60,
              height: 50,
              borderRadius: 5,
              backgroundColor: Colors[theme].grayLight,
            }}
          />
          <View>
            <MediumText style={{ color: Colors[theme].gray }}>
              View on map
            </MediumText>
            <BoldText style={{ color: Colors[theme].text }}>
              TF Hostels, Accra
            </BoldText>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <BoldText>Features</BoldText>
          <CarFeatureCard />
        </View>
      </View>
    </View>
  );
};

export default CarDetails;
