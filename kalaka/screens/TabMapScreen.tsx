import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import Dimensions from "../constants/Layout";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { getMap, updateLocation } from "../services";
import { Button } from "native-base";

export default function TabMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const { data } = useQuery("map", () => getMap(), { refetchInterval: 2000 });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  }

  //Location.watchPositionAsync({  }, (location) => {
  //  setLocation(location);
  //});

  const handleLocationUpdate = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    setRegion({
      latitude: currentLocation?.coords.latitude,
      longitude: currentLocation?.coords.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
    if (currentLocation)
      await updateLocation(currentLocation?.coords.longitude + "", currentLocation?.coords.latitude + "");
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {/*location ? (
          <Marker
            coordinate={{ latitude: location?.coords.latitude, longitude: location.coords.longitude }}
            title="Look at mee"
            description="Im mister meeseeks"
          ></Marker>
        ) : (
          <></>
        )*/}
        {data?.map((markerData: any, index: number) => (
          <Marker
            key={index}
            coordinate={{ latitude: +markerData.location.latitude, longitude: +markerData.location.longitude }}
            title={markerData.firstName}
          />
        ))}
      </MapView>

      <View style={styles.informations}>
        <Button onPress={() => handleLocationUpdate()}>Update location</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  informations: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
  },
  map: {
    width: Dimensions.window.width,
    height: Dimensions.window.height,
  },
});
