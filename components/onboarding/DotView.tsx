import { StyleSheet } from "react-native";
import { BoldText } from "../StyledText";
import { View } from "../Themed";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

const DotView = ({ id }: { id: number }) => {
  const theme = useColorScheme();

  return (
    <View style={styles.dotViewContainer}>
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 0 ? Colors[theme].text : Colors[theme].gray,
          },
        ]}
      />
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 1 ? Colors[theme].text : Colors[theme].gray,
          },
        ]}
      />
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 2 ? Colors[theme].text : Colors[theme].gray,
          },
        ]}
      />
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 3 ? Colors[theme].text : Colors[theme].gray,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dotView: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotViewContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});

export default DotView;
