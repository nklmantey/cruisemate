import { View } from "react-native";
import { PrimaryButton } from "../../components/ui/Button";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../../components/StyledText";
import { greetings } from "../../utils";
import { useEffect, useState } from "react";
import SearchBar from "../../components/home/SearchBar";

const HomeScreen = () => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: Colors[theme].background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Ionicons name="menu" color={Colors[theme].text} size={20} />
        <BoldText>Home</BoldText>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "gainsboro",
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 5,
          marginVertical: 24,
        }}
      >
        <Ionicons name="location" color={Colors[theme].gray} size={20} />
        <BoldText style={{ color: Colors[theme].gray }}>
          TF Hostels, Accra, Ghana
        </BoldText>
      </View>

      <BoldText style={{ fontSize: 24 }}>{`${greetings()} Kofi`}</BoldText>

      <SearchBar placeholder="Search" onChangeText={() => {}} />
    </View>
  );
};

export default HomeScreen;
