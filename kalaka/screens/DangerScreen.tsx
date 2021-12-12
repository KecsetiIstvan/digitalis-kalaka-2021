import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { FormControl, Image, View, Text, Button, HStack } from "native-base";
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";

export default function DangerScreen({ route }: RootTabScreenProps<"Danger">) {
  /*
    Mode can be: 
      watchme - voice
      comewithme - map follow
      holdme - periodic monitoring
  */
  const { isLocationEnabled, mode } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [status, setStatus] = React.useState("WALKING");
  const [seconds, setSeconds] = React.useState(90);
  const [needPin, setNeedPin] = React.useState(false);
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
    if (currentLocation) {
      await updateLocation(currentLocation?.coords.longitude + "", currentLocation?.coords.latitude + "");
    }
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
    navigation.push("Root");
  };

  const handleDanger = async () => {
    await updateStatus("DANGER", isLocationEnabled);
    setStatus("DANGER");
    setNeedPin(true);
  };

  const handleOnTripPause = async () => {
    await updateStatus("PAUSE", isLocationEnabled);
    setStatus("PAUSE");
  };

  const userFine = async () => {
    setSeconds(15);
    await updateStatus("WALKING");
  };

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === -10) {
        handleDanger();
      }
      if (seconds > -21) {
        setSeconds(seconds - 1);
      }
      if (seconds === -22) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FormControl isInvalid={false} alignItems={"center"} flex={1}>
          <Button
            onPress={handleDanger}
            style={{ width: 220, height: 220, backgroundColor: Colors.danger, marginTop: 96 }}
          >
            <Text style={{ fontSize: 48, lineHeight: 56, color: Colors.background }}>Segítség</Text>
          </Button>

          {seconds > 0 ? (
            <>
              <Text style={{ marginTop: "auto", fontSize: 16, color: Colors.locationButton }}>
                Még {seconds} másodperc a visszajelzésig
              </Text>
              <Button
                style={{
                  height: 56,
                  paddingLeft: 28,
                  paddingRight: 28,
                  backgroundColor: Colors.background,
                  borderColor: Colors.background,
                  borderWidth: 3,
                  marginBottom: 64,
                }}
              >
                <Text style={{ color: Colors.background, fontWeight: "700" }}>Biztonságban vagyok</Text>
              </Button>
            </>
          ) : (
            <>
              <Text
                style={{
                  marginTop: "auto",
                  fontSize: 16,
                  color: seconds > -10 ? Colors.locationButton : Colors.background,
                }}
              >
                {10 + seconds} másodperced van a vészriasztásig.
              </Text>
              <Button
                onPress={() => userFine()}
                style={{
                  height: 56,
                  paddingLeft: 28,
                  paddingRight: 28,
                  backgroundColor: Colors.background,
                  borderColor: Colors.primary,
                  borderWidth: 3,
                  marginBottom: 64,
                }}
              >
                <Text style={{ color: Colors.text, fontWeight: "700" }}>Biztonságban vagyok</Text>
              </Button>
            </>
          )}

          <HStack width={"100%"} justifyContent={"center"} style={{ marginBottom: 32 }}>
            <Button onPress={handleOnTripEnd} style={{ width: "40%" }}>
              Hazaértem
            </Button>
            <Button onPress={handleOnTripPause} style={{ width: "40%" }}>
              Szünet
            </Button>
          </HStack>
        </FormControl>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
