import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  //Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          AirbnbBold: require("../assets/fonts/AirbnbCereal_W_Bd.otf"),
          AirbnbRegular: require("../assets/fonts/AirbnbCereal_W_Lt.otf"),
          AirbnbMedium: require("../assets/fonts/AirbnbCereal_W_Md.otf"),
          AirbnbExtraBold: require("../assets/fonts/AirbnbCereal_W_XBd.otf"),
          TiemposExtraBold: require("../assets/fonts/TiemposHeadline-Black.otf"),
          ...FontAwesome.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
