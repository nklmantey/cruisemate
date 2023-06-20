import "react-native-gesture-handler";
import { StatusBar, SafeAreaView, Platform } from "react-native";
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
  const user = useAuthStore((state) => state.user);

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

  // console.log(user);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <StatusBar barStyle="default" />
        <RootNavigation colorScheme={colorScheme} />
        <FlashMessage
          position="top"
          floating
          animated
          titleStyle={{ fontFamily: "SFProMedium", fontSize: 16 }}
          duration={3000}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
