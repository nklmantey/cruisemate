import { StyleSheet, TouchableOpacity } from "react-native";
import { BoldText } from "../StyledText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export function PrimaryButton(props: any) {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      {...props}
      style={[styles.primaryButton, { backgroundColor: Colors[theme].text }]}
    >
      <BoldText
        style={{
          color: Colors[theme].background,
          fontSize: 16,
        }}
      >
        {props.title}
      </BoldText>
    </TouchableOpacity>
  );
}

export function SecondaryButton(props: any) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.primaryButton,
        {
          borderColor: Colors[colorScheme ?? "light"].gray,
          borderWidth: 1,
        },
      ]}
    >
      <BoldText
        style={{
          fontSize: 16,
        }}
      >
        {props.title}
      </BoldText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "transparent",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});
