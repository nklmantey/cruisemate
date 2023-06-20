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
          // AirbnbBold: require("../assets/fonts/Airbnb-Bold.otf"),
          // AirbnbRegular: require("../assets/fonts/Airbnb-Reguar.otf"),
          // AirbnbMedium: require("../assets/fonts/Airbnb-Medium.otf"),
          SFProExtraBold: require("../assets/fonts/SFProText-Black.otf"),
          SFProBold: require("../assets/fonts/SFProText-Bold.otf"),
          SFProMedium: require("../assets/fonts/SFProText-Medium.otf"),
          SFProRegular: require("../assets/fonts/SFProText-Regular.otf"),
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
