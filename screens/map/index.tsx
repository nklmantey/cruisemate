import { View } from "react-native";
import { screenHeight, screenWidth } from "../../constants/Dimensions";
import MapView from "react-native-maps";
import { useAuthStore } from "../../store/useAuthStore";

const MapScreen = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MapView
        style={{ width: screenWidth, height: screenHeight }}
        showsMyLocationButton
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: user?.location?.lat,
          longitude: user?.location?.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
};
export default MapScreen;
