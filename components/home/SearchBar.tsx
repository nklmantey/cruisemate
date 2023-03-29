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
  const [visible, setVisible] = useState<boolean>(false);
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
          marginVertical: 24,
          paddingHorizontal: 8,
        }}
      >
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

        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <Ionicons name="search" color={Colors[theme].gray} size={20} />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    padding: 12,
    fontSize: 16,
    width: "85%",
    alignSelf: "center",
    fontFamily: "AirbnbMedium",
  },
});
