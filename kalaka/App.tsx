import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
import Toast from "react-native-toast-message";

export default function App() {
  const queryClient = new QueryClient();

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Navigation />
            <StatusBar />
            <Toast />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }
}
