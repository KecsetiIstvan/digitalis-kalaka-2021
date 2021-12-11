import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "native-base";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useQuery } from "react-query";
import { me } from "../services";
import { readText } from '../services/fakeCallService';
import randomWords from 'random-words';
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import Voice from '@react-native-voice/voice';
import { Audio } from 'expo-av';
import { alertContacts } from "../services/alertService";
import Permissions from 'react-native-permissions';
export default function TabFollowScreen({ navigation }: RootTabScreenProps<"TabFollow">) {
  const [shouldPlayVoiceCycle, setShouldPlayVoiceCycle] = React.useState<boolean>(false);

  Voice.onSpeechStart = (e) => {console.log('Speech start')};
  Voice.onSpeechEnd = (e) => { console.log(e)};
  Voice.onSpeechResults = (e) => {
    console.log(e)
    if(e.value?.includes('apple')) {
      setShouldPlayVoiceCycle(false)
    }
  };
  
  const voiceCycleCallback = () => {
    readText(randomWords({exactly:60, join: ' '}), startVoice)
  }

  const startVoice = () => {
    Voice.start('en-US'); 
    setTimeout(() => { shouldPlayVoiceCycle ? voiceCycleCallback() : () => {} }, 5000)
  }

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Permissions.request(Permissions.PERMISSIONS.ANDROID.SEND_SMS);
    })();
    if(shouldPlayVoiceCycle) {
      Toast.show({
        type: 'info',
        text1: 'Apple',
        text2: 'A biztonsági szavad'
      })
      voiceCycleCallback();
    }
  }, [shouldPlayVoiceCycle]);

  return (
    <View style={styles.container}>
      <Button onPress={() => setShouldPlayVoiceCycle(true)}>Start cycle</Button>
      <Button onPress={() => alertContacts()}>Send emergency SMS</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
