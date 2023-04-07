import { View } from "./Themed";
import { Image } from "react-native";
import useColorScheme from "../hooks/useColorScheme";

const EmptyState = ({ children }: any) => {
  const theme = useColorScheme();

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
        style={{ height: 200 }}
        resizeMode="contain"
        source={
          theme === "dark"
            ? require("../assets/emptylight.png")
            : require("../assets/emptydark.png")
        }
      />
      {children}
    </View>
  );
};

export default EmptyState;
