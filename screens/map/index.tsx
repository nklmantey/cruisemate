import { View, Image } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useUserAuthStore } from "../../store/useUserAuthStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";

const MapScreen = () => {
  const user = useUserAuthStore((state) => state.user);
  const [rentalSuppliers, setRentalSuppliers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRentalSuppliers() {
      try {
        const querySnapshot = await getDocs(collection(db, "rentalsuppliers"));
        const fetchedSuppliers = querySnapshot.docs.map((doc) => doc.data());

        setRentalSuppliers((prev) => [...prev, ...fetchedSuppliers]);
      } catch (error) {
        console.error("Error fetching rental suppliers:", error);
      }
    }

    fetchRentalSuppliers();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          latitude: user?.location?.lat!,
          longitude: user?.location?.lng!,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {rentalSuppliers.map((r: any) => (
          <Marker
            coordinate={{
              latitude: r.location.latitude,
              longitude: r.location.longitude,
            }}
            title={r.shopName}
          />
        ))}
      </MapView>

      {/* <NearbyCard /> */}
    </View>
  );
};
export default MapScreen;
