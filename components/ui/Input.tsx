import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { RegularText } from "../StyledText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export type InputProps = {
  label?: string;
  placeholder: string;
  onChangeText(e: any): void;
  maxLength?: number;
  style?: ViewStyle;
  multiline?: boolean;
  value?: string;
  editable?: boolean;
};

const Input = (props: InputProps) => {
  const theme = useColorScheme();

  return (
    <View {...props} style={props.style}>
      <RegularText>{props.label}</RegularText>

      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={Colors[theme].gray}
        onChangeText={props.onChangeText}
        style={[
          styles.input,
          {
            borderColor: Colors[theme].gray,
            color: Colors[theme].text,
          },
        ]}
        value={props.value}
        editable={props.editable}
        multiline={props.multiline}
        maxLength={props.maxLength}
      />
    </View>
  );
};

const NumInput = ({
  label,
  placeholder,
  onChangeText,
  maxLength,
}: InputProps) => {
  const theme = useColorScheme();

  return (
    <View>
      <RegularText>{label}</RegularText>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors[theme].gray}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            borderColor: Colors[theme].gray,
            color: Colors[theme].text,
          },
        ]}
        keyboardType={"numeric"}
        maxLength={maxLength}
      />
    </View>
  );
};

const PwdInput = ({ label, placeholder, onChangeText }: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useColorScheme();

  return (
    <View>
      <RegularText>{label}</RegularText>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          alignSelf: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors[theme].gray}
          onChangeText={onChangeText}
          secureTextEntry={visible ? false : true}
          style={[
            styles.input,
            {
              borderWidth: 0,
              color: Colors[theme].text,
              width: "85%",
              borderRadius: 8,
            },
          ]}
        />

        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            flex: 1,
            alignItems: "center",
          }}
          onPress={() => {
            setVisible((prev) => !prev);
          }}
        >
          <Ionicons
            name={visible ? "eye-off" : "eye"}
            color={Colors[theme].text}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Input, NumInput, PwdInput };

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 18,
    // borderWidth: 0.5,
    // borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    fontFamily: "AirbnbMedium",
  },
});
