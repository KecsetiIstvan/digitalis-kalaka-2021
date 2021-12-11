import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { extendTheme, NativeBaseProvider } from "native-base";
import Toast from "react-native-toast-message";
import ComponentsTheme from "./constants/ComponentsTheme";

export default function App() {
  const queryClient = new QueryClient();

  const isLoadingComplete = useCachedResources();

  const theme = extendTheme(ComponentsTheme);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NativeBaseProvider theme = {theme}>
            <Navigation />
            <StatusBar />
            <Toast />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
