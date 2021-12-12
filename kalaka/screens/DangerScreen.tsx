import * as React from "react";
import { StyleSheet } from "react-native";
import { FormControl, Image, View, Text, Button } from "native-base";
import * as Location from "expo-location";
import { updateLocation, updateStatus } from "../services";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import Voice from '@react-native-voice/voice';
import { Audio } from 'expo-av';
import Permissions from 'react-native-permissions';
import { readText } from '../services/fakeCallService';
import randomWords from 'random-words';
import { alertContacts, falseAlarm } from "../services/alertService";

export default function DangerScreen({ route }: RootTabScreenProps<"Danger">) {
  /*
    Mode can be: 
      watchme - voice
      comewithme - map follow
      holdme - periodic monitoring
  */
  const { isLocationEnabled, mode } = route.params;
  const [shouldPlayVoiceCycle, setShouldPlayVoiceCycle] = React.useState<boolean>(mode === 'watchme');

  Voice.onSpeechStart = (e) => { console.log('Speech start') };
  Voice.onSpeechError =(e) => { if(e.error) { 
    setShouldPlayVoiceCycle(false);
    handleDanger();
    alertContacts();
   }}
  Voice.onSpeechResults = (e) => {
    if(e.value?.includes('apple')) {
      setShouldPlayVoiceCycle(false);
      handleDanger();
      alertContacts();
    } else {
      voiceCycleCallback()
    }
  };
  
  const voiceCycleCallback = () => {
    readText(randomWords({exactly:30, join: ' '}), startVoice)
  }

  const startVoice = () => {
    Voice.start('en-US');
  }

  useEffect(() => {
    if(mode === 'watchme') {
      (async () => {
        await Audio.requestPermissionsAsync();
        await Permissions.request(Permissions.PERMISSIONS.ANDROID.SEND_SMS);
        await Permissions.request(Permissions.PERMISSIONS.ANDROID.CALL_PHONE);
      })();
      if(shouldPlayVoiceCycle) {
        Toast.show({
          type: 'info',
          text1: 'Apple',
          text2: 'A biztonsági szavad'
        })
        voiceCycleCallback();
      }
    }
  
  }, [shouldPlayVoiceCycle]);

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
