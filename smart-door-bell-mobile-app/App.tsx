import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import StoreProvider from "./store/StoreProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StoreProvider>
          <Navigation />
        </StoreProvider>
        <StatusBar animated style="dark" />
      </SafeAreaProvider>
    );
  }
}
