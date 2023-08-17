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
          // InterSoftBold: require("../assets/fonts/InterSoftCereal_W_Bd.otf"),
          // InterSoftRegular: require("../assets/fonts/InterSoftCereal_W_Lt.otf"),
          // InterSoftMedium: require("../assets/fonts/InterSoftCereal_W_Md.otf"),
          // InterSoftExtraBold: require("../assets/fonts/InterSoftCereal_W_XBd.otf"),
          InterSoftBold: require("../assets/fonts/InterSoft-Bold.otf"),
          InterSoftMedium: require("../assets/fonts/InterSoft-Medium.otf"),
          InterSoftRegular: require("../assets/fonts/InterSoft-Regular.otf"),
          InterSoftSemibold: require("../assets/fonts/InterSoft-Semibold.otf"),
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
