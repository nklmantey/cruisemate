import { TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RegularText } from "./StyledText";
import { View } from "./Themed";
import { Ionicons } from "@expo/vector-icons";

type ImageUploadProps = {
  uploadText: string;
  onPress: () => void;
};

const ImageUpload = ({ uploadText, onPress }: ImageUploadProps) => {
  const theme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: Colors[theme].text,
        borderStyle: "dashed",
        aspectRatio: 16 / 9,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Ionicons name="cloud-upload" size={20} color={Colors[theme].text} />
      <RegularText>{uploadText}</RegularText>
    </TouchableOpacity>
  );
};
export default ImageUpload;
