import { Text, TextProps } from "./Themed";

export function ExtraBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "AirbnbExtraBold" }]} />
  );
}

export function BoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "AirbnbBold" }]} />
  );
}

export function RegularText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "AirbnbRegular" }]} />
  );
}

export function MediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "AirbnbMedium" }]} />
  );
}
