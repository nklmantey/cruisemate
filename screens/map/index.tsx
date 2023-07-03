import { View, StatusBar, Image } from "react-native";
import { screenHeight, screenWidth } from "../../constants/Dimensions";
import MapView, { Marker } from "react-native-maps";
import { useAuthStore } from "../../store/useAuthStore";
import NearbyCard from "../../components/map/NearbyCard";
import Logo from "../../assets/icon.png";

const MapScreen = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="default" />

      <MapView
        style={{
          width: screenWidth,
          height: screenHeight,
          position: "relative",
        }}
        provider={undefined}
        showsMyLocationButton
        showsUserLocation={true}
        followsUserLocation
        initialRegion={{
          latitude: user?.location?.lat!,
          longitude: user?.location?.lng!,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: user?.location.lat ?? 0,
            longitude: user?.location.lng ?? 0,
          }}
          title="Joe's Car Rentals"
        />
      </MapView>

      {/* <NearbyCard /> */}
    </View>
  );
};
export default MapScreen;
