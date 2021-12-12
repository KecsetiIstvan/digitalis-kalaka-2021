import React, { useState, useEffect, createRef } from "react";
import { StyleSheet, Image, Platform } from "react-native";

import { Text, View } from "../components/Themed";
import Dimensions from "../constants/Layout";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useQuery } from "react-query";
import { getMap, updateLocation } from "../services";
import { Box, Button } from "native-base";
import * as Animatable from "react-native-animatable";
import Colors from "../constants/Colors";
import Permissions from 'react-native-permissions';
import { RootTabScreenProps } from "../types";

export default function TabMapScreen({ navigation }: RootTabScreenProps<"TabSettings">) {
  const [region, setRegion] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [elRefMutants, setElRefMutants] = React.useState<any>([]);

  const [danger, setDanger] = React.useState(false);

  const animate = (markerData: any) => {
    markerData.map((m: any, index: any) => {
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
    });
  };

  const { data } = useQuery(
    "map",

    () => {
      return getMap();
    },
    { refetchInterval: 1000, cacheTime: 0 }
  );

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Engedélyezned kell a helymeghatározást!");
        return;
      }
    })();
  }, []);

  React.useEffect(() => {
    // add or remove refs
    if (data?.length > 0) {
      let dangerStatus = false;
      data.map((d: any) => {
        if (d.status === "DANGER") dangerStatus = true;
      });
      setDanger(dangerStatus);

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
    }
    if (data) {
      animate(data);
    }
  }, [data]);

  //Location.watchPositionAsync({  }, (location) => {
  //  setLocation(location);
  //});

  const handleSetRegion = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    if (region.latitude === 0) {
      setRegion({
        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  React.useEffect(() => {
    handleSetRegion();
  }, []);

  const getNameInitials = (firstName: string, lastName: string) =>
    firstName && lastName ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : "";

  function isObject(obj: any) {
    return obj != null && obj.constructor.name === "Object";
  }

  return (
    <View style={styles.container}>
      {region.latitude !== 0 && (
        <>
          <MapView style={styles.map} initialRegion={region} showsCompass={false} loadingEnabled={true} >
            {data?.map((markerData: any, index: number) =>
              elRefMutants[index]?.ref &&
              elRefMutants[index]?.info?.isLocationShared &&
              elRefMutants[index]?.info?.status !== "IDLE" ? (
                // @ts-ignore
                <Marker.Animated
                  ref={elRefMutants[index]?.ref}
                  key={elRefMutants[index]?.ref?.info?._id}
                  onPress={() => navigation.navigate('Chat', {user: elRefMutants[index]?.info})}
                  coordinate={{
                    latitude: +elRefMutants[index]?.info.location.latitude,
                    longitude: +elRefMutants[index]?.info.location.longitude,
                  }}
                >
                  {elRefMutants[index]?.info?.profileImageUrl &&
                  !isObject(elRefMutants[index]?.info?.profileImageUrl) ? (
                    <Animatable.View
                      animation={elRefMutants[index]?.info.status === "DANGER" ? "flash" : ""}
                      duration={2000}
                      delay={1000}
                      iterationCount="infinite"
                    >
                      <Image
                        style={{
                          width: 60,
                          height: 60,
                          borderColor: elRefMutants[index]?.info.status === "DANGER" ? Colors.danger : Colors.primary,
                          borderWidth: 5,
                          borderRadius: 75,
                        }}
                        source={{ uri: elRefMutants[index]?.info?.profileImageUrl }}
                        resizeMode={"cover"}
                      />
                    </Animatable.View>
                  ) : (
                    <Animatable.View
                      animation={elRefMutants[index]?.info.status === "DANGER" ? "flash" : ""}
                      duration={2000}
                      delay={1000}
                      iterationCount="infinite"
                    >
                      <Box
                        style={{
                          borderRadius: 100,
                          backgroundColor:
                            elRefMutants[index]?.info.status === "DANGER" ? Colors.danger : Colors.primary,
                          width: 60,
                          height: 60,
                        }}
                      >
                        <Text style={styles.initial}>
                          {elRefMutants[index]?.info
                            ? getNameInitials(elRefMutants[index]?.info.firstName, elRefMutants[index]?.info.lastName)
                            : "-"}
                        </Text>
                      </Box>
                    </Animatable.View>
                  )}
                  {/* @ts-ignore */}
                </Marker.Animated>
              ) : (
                <></>
              )
            )}
          </MapView>
          {danger && (
            <Box position={"absolute"} width={"100%"} height={"100%"} pointerEvents="none">
              <Animatable.View
                animation={danger ? "fadeOut" : ""}
                duration={2000}
                delay={2000}
                iterationCount="infinite"
              >
                <Box
                  width={"100%"}
                  height={"100%"}
                  backgroundColor={Colors.danger}
                  bg={Colors.danger}
                  opacity={0.5}
                ></Box>
              </Animatable.View>
            </Box>
          )}
        </>
      )}
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
  initial: {
    fontSize: 26,
    lineHeight: 72,
    color: "#ffffff",
    textAlign: "center",
  },
});
