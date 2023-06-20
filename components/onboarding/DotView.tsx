import { StyleSheet } from "react-native";
import { BoldText } from "../StyledText";
import { View } from "../Themed";

const DotView = ({ id }: { id: number }) => {
  return (
    <View style={styles.dotViewContainer}>
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 0 ? "white" : "grey",
          },
        ]}
      />
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 1 ? "white" : "grey",
          },
        ]}
      />
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 2 ? "white" : "grey",
          },
        ]}
      />
      <View
        style={[
          styles.dotView,
          {
            backgroundColor: id === 3 ? "white" : "grey",
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
