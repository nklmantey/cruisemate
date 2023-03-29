import React from "react";
import { ScrollView as NativeScrollView, ScrollViewProps } from "react-native";
import { View } from "../components/Themed";
import Constants from "expo-constants";
export function Row(props: any) {
  return (
    <View
      {...props}
      style={[
        props.style,
        { flexDirection: "row", backgroundColor: "transparent" },
      ]}
    />
  );
}

export function ScrollViewPage(props: ScrollViewProps) {
  return (
    <NativeScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 80,
      }}
      {...props}
      style={[props.style, { backgroundColor: "black" }]}
    />
  );
}
