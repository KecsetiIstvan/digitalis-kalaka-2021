import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import Dimensions from '../constants/Layout';
import * as Location from 'expo-location';
import MapView, { Marker }  from 'react-native-maps';

export default function TabTwoScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<any>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  }

  Location.watchPositionAsync({}, (location) => {
    setLocation(location);
  })

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}> 
          {location ? 
          <Marker
           coordinate={{ latitude : location?.coords.latitude, longitude : location.coords.longitude }}
           title='Look at mee'
           description='Im mister meeseeks'
          >
          </Marker>
           :
           <></>
          }
         
      </MapView>

      <View style={styles.informations}>
        <Text >{'Timestamp:' + location?.timestamp}</Text>
        <Text >{'Speed:' + location?.coords.speed}</Text>
        <Text >{'Heading:' + location?.coords.heading}</Text>
        <Text >{'Accuracy:' + location?.coords.accuracy}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  informations: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black'
  },
  map: {
    width: Dimensions.window.width,
    height: Dimensions.window.height,
  }
});
