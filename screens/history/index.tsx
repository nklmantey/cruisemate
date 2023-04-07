import { View } from "../../components/Themed";
import EmptyState from "../../components/EmptyState";
import { BoldText } from "../../components/StyledText";

const HistoryScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EmptyState>
        <BoldText style={{ fontSize: 24, textAlign: "center", marginTop: 16 }}>
          No rental history!
        </BoldText>
      </EmptyState>
    </View>
  );
};
export default HistoryScreen;
