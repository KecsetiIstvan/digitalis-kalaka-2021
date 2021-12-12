import * as React from "react";
import { Animated, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Button, FormControl, HStack, Input, SimpleGrid, Switch } from "native-base";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useQuery } from "react-query";
import { me, updateStatus } from "../services";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function TabFollowScreen({ navigation }: RootTabScreenProps<"TabFollow">) {
  const [whereYouGO, setWhereYouGo] = React.useState<string>("");
  const [selectedOption, setSelectedOption] = React.useState("none");
  const [isLocationEnabled, setIsLocationEnabled] = React.useState<boolean>(false);

  const [error, setError] = React.useState(false);

  const handleStart = async () => {
    if (selectedOption === "none") {
      setError(true);
      setTimeout(() => setError(false), 500);
    } else {
      await handleOnTripBegin();
      navigation.navigate("Danger", { isLocationEnabled, mode: selectedOption });
    }
  };

  const handleOnTripBegin = async () => {
    await updateStatus("WALKING", isLocationEnabled);
  };

  return (
    // @ts-ignore
    <SafeAreaView flex={1}>
      <View style={styles.container}>
        <FormControl.Label color={Colors.text}>Hova kísérjünk?</FormControl.Label>
        <GooglePlacesAutocomplete
 placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyC9X7nSZ-9FdcAm8plMeDPbsHRGEvigKR4',
        language: 'en',
      }}></GooglePlacesAutocomplete>
       

        <HStack alignItems="center" marginBottom={48}>
          <Text
            onPress={() => setIsLocationEnabled(!isLocationEnabled)}
            style={{ ...styles.text, marginRight: "auto" }}
          >
            Helymegosztás bekapcsolása
          </Text>
          <Switch
            size="sm"
            offTrackColor={Colors.secondaryTransparent}
            trackColor={{ true: Colors.primary }}
            isChecked={isLocationEnabled}
            onToggle={() => setIsLocationEnabled(!isLocationEnabled)}
          />
        </HStack>

        <Box style={{ alignSelf: "center" }}>
          <SimpleGrid columns={2}>
            <Button
              onPress={() => (selectedOption !== "watchme" ? setSelectedOption("watchme") : setSelectedOption("none"))}
              backgroundColor={Colors.textTransparent}
              size={140}
              marginTop={0}
              marginBottom={2}
              marginRight={2}
              style={{ 
                borderTopLeftRadius: 1000,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                overflow: "hidden",
              }}
            >
              <Animatable.Text animation={error ? "flash" : ""} delay={400}>
                <FontAwesome5
                  name="microphone"
                  size={32}
                  color={selectedOption === "watchme" ? Colors.text : Colors.background}
                  style={{ marginRight: 0 }}
                />
              </Animatable.Text>
            </Button>
            <Button
              onPress={() =>
                selectedOption !== "comewithme" ? setSelectedOption("comewithme") : setSelectedOption("none")
              }
              backgroundColor={Colors.locationButton}
              size={140}
              marginTop={0}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 1000,
                borderBottomRightRadius: 60,
                borderBottomLeftRadius: 0,
                overflow: "hidden",
              }}
            >
              <Animatable.Text animation={error ? "flash" : ""} delay={400}>
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                    style={{ position: "absolute", marginLeft: 0, paddingBottom: 6 }}
                  />
                </Box>
              </Animatable.Text>
            </Button>
            <Button
              onPress={() => (selectedOption !== "holdme" ? setSelectedOption("holdme") : setSelectedOption("none"))}
              backgroundColor={Colors.primary}
              size={140}
              marginTop={0}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 1000,
                overflow: "hidden",
              }}
            >
              <Animatable.Text animation={error ? "flash" : ""} delay={400}>
                <FontAwesome5
                  solid
                  name="hand-paper"
                  size={32}
                  color={selectedOption === "holdme" ? Colors.text : Colors.background}
                  style={{ marginRight: 0 }}
                />
              </Animatable.Text>
            </Button>
            <Button
              onPress={() => handleStart()}
              backgroundColor={Colors.dangerTransparet}
              marginBottom={0}
              marginTop={65}
              marginLeft={2}
              h={75}
              w={140}
              style={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 0,
              }}
            >
              <Text style={{ color: Colors.background, fontSize: 20, fontWeight: "bold" }}>Indulhatunk!</Text>
            </Button>
          </SimpleGrid>

          <Box
            size={140}
            backgroundColor={Colors.background}
            style={{
              alignSelf: "center",
              position: "absolute",
              top: "25%",
              borderRadius: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("SplashScreenOnboardingModal")}>
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
            </TouchableOpacity>
          </Box>
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
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
