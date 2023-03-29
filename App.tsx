import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColorScheme from "./hooks/useColorScheme";
import useCachedResources from "./hooks/useCachedResources";
import FlashMessage from "react-native-flash-message";

const App = () => {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

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
