import * as React from "react";
import { StyleSheet } from "react-native";
import { Box, Button, FormControl, HStack, Input, SimpleGrid, Switch } from "native-base";
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
  
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabFollowScreen({ navigation }: RootTabScreenProps<"TabFollow">) {
  const [whereYouGO, setWhereYouGo] = React.useState<string>("");

  const [selectedOption, setSelectedOption] = React.useState("none");

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
      <FormControl.Label color={Colors.text}>Hova kísérjünk?</FormControl.Label>
      <Input value={whereYouGO} onChangeText={setWhereYouGo} placeholder="" type="text" marginBottom={4} />

      <HStack alignItems="center" marginBottom={48}>
        <Text style={{ ...styles.text, marginRight: "auto" }}>Helymegosztás bekapcsolása</Text>
        <Switch size="sm" offTrackColor={Colors.secondaryTransparent} trackColor={{ true: Colors.primary }} />
      </HStack>

      <Box style={{ alignSelf: "center" }}>
        <SimpleGrid columns={2}>
          <Button
            onPress={() => (selectedOption !== "watchme" ? setSelectedOption("watchme") : setSelectedOption("none"))}
            backgroundColor={Colors.textTransparent}
            h={140}
            w={140}
            style={{
              borderTopLeftRadius: 1000,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              overflow: "hidden",
            }}
          >
            <FontAwesome5
              name="microphone"
              size={32}
              color={selectedOption === "watchme" ? Colors.text : Colors.background}
              style={{ marginRight: 0 }}
            />
          </Button>
          <Button
            onPress={() =>
              selectedOption !== "comewithme" ? setSelectedOption("comewithme") : setSelectedOption("none")
            }
            backgroundColor={Colors.locationButton}
            h={140}
            w={140}
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 1000,
              borderBottomRightRadius: 60,
              borderBottomLeftRadius: 0,
              overflow: "hidden",
            }}
          >
            <FontAwesome5
              name="map-marker"
              size={32}
              color={selectedOption === "comewithme" ? Colors.text : Colors.background}
              style={{ marginRight: 0 }}
            />
            <FontAwesome5
              solid
              name="circle"
              size={12}
              color={Colors.locationButton}
              style={{ position: "absolute", marginLeft: 6, marginTop: 6 }}
            />
          </Button>
          <Button
            onPress={() => (selectedOption !== "holdme" ? setSelectedOption("holdme") : setSelectedOption("none"))}
            backgroundColor={Colors.primary}
            h={137}
            w={140}
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 1000,
              overflow: "hidden",
            }}
          >
            <FontAwesome5
              solid
              name="hand-paper"
              size={32}
              color={selectedOption === "holdme" ? Colors.text : Colors.background}
              style={{ marginRight: 0 }}
            />
          </Button>
          <Box marginTop={1}>
            <Button
              backgroundColor={Colors.dangerTransparet}
              h={79}
              w={140}
              marginTop={60}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 0,
              }}
            >
              <Text style={{ color: Colors.background, fontSize: 20, fontWeight: "bold" }}>Indulhatunk!</Text>
            </Button>
          </Box>
        </SimpleGrid>
        <Box
          width={140}
          height={138}
          backgroundColor={"#fff"}
          style={{
            position: "absolute",
            left: "50%",
            marginLeft: -74,
            top: "50%",
            marginTop: -73,
            borderRadius: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box marginTop="1">
            <FontAwesome5 solid name="circle" size={40} color={Colors.text} />
            <FontAwesome5
              style={{ position: "absolute", marginLeft: 16, marginTop: 8 }}
              solid
              name="info"
              size={22}
              color={Colors.background}
            />
          </Box>
        </Box>
      </Box>
>>>>>>> dev_Zsolt
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    marginTop: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: Colors.secondary,
  },
});
