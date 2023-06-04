import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BoldText } from "../StyledText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

type ButtonProps = {
  title: string | JSX.Element;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
};

export function PrimaryButton({
  title,
  style,
  textStyle,
  onPress,
}: ButtonProps) {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.primaryButton,
        { backgroundColor: Colors[theme].text, ...style },
      ]}
    >
      <BoldText
        style={[
          {
            color: Colors[theme].background,
            fontSize: 16,
            ...textStyle,
          },
        ]}
      >
        {title}
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
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "transparent",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});
