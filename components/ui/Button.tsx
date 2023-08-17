import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BoldText } from "../StyledText";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View } from "../Themed";

type ButtonProps = {
  title: string | JSX.Element;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

export function PrimaryButton({
  title,
  style,
  textStyle,
  onPress,
  disabled,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.primaryButton,
        { backgroundColor: disabled ? "gray" : Colors[theme].text, ...style },
      ]}
    >
      {leftIcon && (
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {leftIcon}
          <BoldText
            style={[
              {
                color: Colors[theme].background,
                fontSize: 17,
                ...textStyle,
              },
            ]}
          >
            {title}
          </BoldText>
        </View>
      )}

      {rightIcon && (
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BoldText
            style={[
              {
                color: Colors[theme].background,
                fontSize: 17,
                ...textStyle,
              },
            ]}
          >
            {title}
          </BoldText>
          {rightIcon}
        </View>
      )}

      {!leftIcon && !rightIcon && (
        <BoldText
          style={[
            {
              color: Colors[theme].background,
              fontSize: 17,
              ...textStyle,
            },
          ]}
        >
          {title}
        </BoldText>
      )}
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
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: "transparent",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});
