import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColorScheme from "./hooks/useColorScheme";
import useCachedResources from "./hooks/useCachedResources";
import FlashMessage from "react-native-flash-message";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  const setUser = useAuthStore((state) => state.setUser);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUser({
      location: {
        lat: location?.coords?.latitude,
        lng: location?.coords?.longitude,
      },
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" />
      <RootNavigation colorScheme={colorScheme} />
      <FlashMessage
        position="top"
        floating
        animated
        titleStyle={{ fontFamily: "InterSoftMedium", fontSize: 16 }}
        duration={3000}
      />
    </SafeAreaProvider>
  );
};

export default App;
