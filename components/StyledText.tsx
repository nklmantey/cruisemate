import { Text, TextProps } from "./Themed";

export function ExtraBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterSoftBold" }]} />
  );
}

export function BoldText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "InterSoftSemibold" }]}
    />
  );
}

export function RegularText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "InterSoftRegular" }]}
    />
  );
}

export function MediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterSoftMedium" }]} />
  );
}
