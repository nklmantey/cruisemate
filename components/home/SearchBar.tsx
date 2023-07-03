import { useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  placeholder,
  onChangeText,
}: {
  placeholder: string;
  onChangeText(): void;
}) => {
  const theme = useColorScheme();

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          alignSelf: "center",
          borderColor: Colors[theme].gray,
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 16,
          paddingHorizontal: 4,
        }}
      >
        <View style={{ alignItems: "center", marginLeft: 8 }}>
          <Ionicons name="search" color={Colors[theme].gray} size={20} />
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors[theme].gray}
          onChangeText={onChangeText}
          style={[
            styles.input,
            {
              color: Colors[theme].text,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    padding: 8,
    fontSize: 16,
    width: "85%",
    alignSelf: "center",
    fontFamily: "AirbnbMedium",
  },
});
