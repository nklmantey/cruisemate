import React from "react";
import { View, Image } from "react-native";

const EmptyState = ({ children }: any) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: 150 }}
        resizeMode="contain"
        source={require("../assets/images/empty.png")}
      />
      {children}
    </View>
  );
};

export default EmptyState;
