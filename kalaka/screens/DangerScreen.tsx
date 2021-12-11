import * as React from "react";
import { StyleSheet } from "react-native";
import { FormControl, Image, View, Text, Button } from "native-base";
import * as Location from "expo-location";
import { updateLocation, updateStatus } from "../services";
import { RootTabScreenProps } from "../types";

export default function DangerScreen({ route }: RootTabScreenProps<"Danger">) {
  const { isLocationEnabled } = route.params;

  const handleLocationUpdate = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    if (currentLocation)
      await updateLocation(currentLocation?.coords.longitude + "", currentLocation?.coords.latitude + "");
  };

  React.useEffect(() => {
    (async () => {
      if (isLocationEnabled) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Engedélyezned kell a helymeghatározást!");
          return;
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    if (isLocationEnabled) {
      const interval = setInterval(() => {
        handleLocationUpdate();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleOnTripEnd = async () => {
    await updateStatus("IDLE", false);
  };

  const handleDanger = async () => {
    await updateStatus("DANGER", isLocationEnabled);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }} alt="Login page image" size="xl" />

      <FormControl isInvalid={false} w={{ base: "75%", md: "25%" }} alignItems={"center"}>
        <Text fontSize={"lg"}> I'm in danger {"\n"}</Text>

        <Button onPress={handleDanger}>I'm in danger</Button>
        <Button>Call me</Button>
        <Button onPress={handleOnTripEnd}>I'm home</Button>
        <Button>Pause</Button>
      </FormControl>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
