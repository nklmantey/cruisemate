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
          borderColor: Colors[theme].gray,
          borderWidth: 0.5,
          justifyContent: "space-between",
          borderRadius: 5,
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
              borderRadius: 5,
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

type RadioInputProps = {
  label?: string;
  radioOption: string;
  bgCol: string;
  onPress(): void;
};
const RadioInput = ({
  label,
  radioOption,
  bgCol,
  onPress,
}: RadioInputProps) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        marginVertical: 8,
        flex: 1,
      }}
    >
      <RegularText>{label}</RegularText>

      <View
        style={[
          styles.input,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <RegularText>{radioOption}</RegularText>
        <TouchableOpacity style={styles.radioBtnContainer} onPress={onPress}>
          <View
            style={[
              styles.radioButton,
              {
                backgroundColor: bgCol,
                borderColor: Colors[theme].text,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export { Input, NumInput, PwdInput, RadioInput };

const styles = StyleSheet.create({
  input: {
    padding: 12,
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 5,
    width: "100%",
    alignSelf: "center",
    fontFamily: "AirbnbMedium",
  },

  radioBtnContainer: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  radioButton: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
