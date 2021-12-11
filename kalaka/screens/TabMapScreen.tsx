import React, { useState, useEffect, createRef } from "react";
import { StyleSheet, Image, Platform } from "react-native";

import { Text, View } from "../components/Themed";
import Dimensions from "../constants/Layout";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { getMap, updateLocation } from "../services";
import { Button } from "native-base";
import uuid from "react-native-uuid";

export default function TabMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [elRefMutants, setElRefMutants] = React.useState<any>([]);

  const animate = (markerData: any) => {
    markerData.map((m: any, index: any) => {
      if (false) {
        if (
          elRefMutants[index] &&
          elRefMutants[index].ref &&
          elRefMutants[index].ref.current &&
          elRefMutants[index].ref.current
        ) {
          elRefMutants[index]?.ref.current._component.animateMarkerToCoordinate(
            {
              longitude: parseFloat(elRefMutants[index].info.location.longitude),
              latitude: parseFloat(elRefMutants[index].info.location.latitude),
            },
            500
          );
        }
      } else {
        // `useNativeDriver` defaults to false if not passed explicitly
        if (
          elRefMutants[index] &&
          elRefMutants[index].ref &&
          elRefMutants[index].ref.current &&
          elRefMutants[index].ref.current.timing
        ) {
          elRefMutants[index]?.ref.current
            .timing({ ...elRefMutants[index].info.location, useNativeDriver: true })
            .start();
        }
      }
    });
  };

  const { data } = useQuery(
    "map",
    () => {
      return getMap();
    },
    { refetchInterval: 500 }
  );

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

  React.useEffect(() => {
    // add or remove refs
    if (data?.length > 0)
      setElRefMutants((elRefs: any[]) =>
        Array(data.length)
          .fill(null)
          .map((_, i) => {
            return {
              ref: elRefs[i] || createRef(),
              info: data[i],
            };
          })
      );
    console.log(elRefMutants);
    if (data) {
      animate(data);
      handleLocationUpdate();
    }
  }, [data]);

  //Location.watchPositionAsync({  }, (location) => {
  //  setLocation(location);
  //});

  const handleLocationUpdate = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    if (region.latitude === 0) {
      setRegion({
        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
    if (currentLocation)
      await updateLocation(currentLocation?.coords.longitude + "", currentLocation?.coords.latitude + "");
  };

  return (
    <View style={styles.container}>
      {region.latitude !== 0 && (
        <MapView style={styles.map} initialRegion={region} showsUserLocation={true}>
          {/*location ? (
          <Marker
            coordinate={{ latitude: location?.coords.latitude, longitude: location.coords.longitude }}
            title="Look at mee"
            description="Im mister meeseeks"
          ></Marker>
        ) : (
          <></>
        )*/}
          {data?.map((markerData: any, index: number) =>
            elRefMutants[index]?.ref ? (
              <Marker.Animated
                ref={elRefMutants[index]?.ref}
                coordinate={{
                  latitude: +elRefMutants[index]?.info.location.latitude,
                  longitude: +elRefMutants[index]?.info.location.longitude,
                }}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderColor: "#6165F3",
                    borderWidth: 5,
                    borderRadius: 75,
                  }}
                  source={{ uri: "https://picsum.photos/70/70.jpg" }}
                  resizeMode={"cover"}
                />
              </Marker.Animated>
            ) : (
              <></>
            )
          )}
        </MapView>
      )}

      {/*<View style={styles.informations}>
        <Button onPress={() => handleLocationUpdate()}>Update location</Button>
      </View>*/}
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
