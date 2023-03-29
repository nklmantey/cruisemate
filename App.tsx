import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColorScheme from "./hooks/useColorScheme";
import useCachedResources from "./hooks/useCachedResources";
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

const App = () => {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  const [userLat, setUserLat] = useState<any>();
  const [userLng, setUserLng] = useState<any>();

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLat(location?.coords?.latitude);
      setUserLng(location?.coords?.longitude);
      console.log(userLat, userLng);
    };

    getUserLocation();
  }, [userLat, userLng]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" />
      <RootNavigation colorScheme={colorScheme} />
      <FlashMessage position="top" floating animated />
    </SafeAreaProvider>
  );
};

export default App;
