import { Text, TextProps } from "./Themed";

export function ExtraBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SFProExtraBold" }]} />
  );
}

export function BoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SFProBold" }]} />;
}

export function RegularText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SFProRegular" }]} />
  );
}

export function MediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "SFProMedium" }]} />
  );
}
