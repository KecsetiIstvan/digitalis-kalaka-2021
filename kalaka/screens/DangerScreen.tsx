import * as React from "react";
import { StyleSheet, Vibration } from "react-native";
import { FormControl, Image, View, Text, Button, HStack, Box } from "native-base";
import * as Location from "expo-location";
import { updateLocation, updateStatus } from "../services";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeycodeInput } from "react-native-keycode";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Animatable from "react-native-animatable";

const PINCODE = "6684";

export default function DangerScreen({ route }: RootTabScreenProps<"Danger">) {
  const { isLocationEnabled } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [status, setStatus] = React.useState("WALKING");
  const [seconds, setSeconds] = React.useState(5);
  const [needPin, setNeedPin] = React.useState(false);
  const [afterPin, setAfterPin] = React.useState("");

  const [error, setError] = React.useState(false);

  const handleLocationUpdate = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    if (currentLocation) {
      await updateLocation(currentLocation?.coords.longitude + "", currentLocation?.coords.latitude + "");
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSeconds(15);
    });

    return unsubscribe;
  }, [navigation]);

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
    setStatus("IDLE");
    navigation.push("Root");
  };

  const handleDanger = async () => {
    await updateStatus("DANGER", isLocationEnabled);
    setStatus("DANGER");
  };

  const handleOnTripPause = async () => {
    await updateStatus("PAUSED", isLocationEnabled);
    setStatus("PAUSED");
  };

  const userFine = async () => {
    setSeconds(10);
    await updateStatus("WALKING");
    setStatus("WALKING");
  };

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds === -10) {
        handleDanger();
      }

      if (seconds > -21 && status !== "PAUSED") {
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

  React.useEffect(() => {
    if (seconds <= 0) {
      Vibration.vibrate([100]);
    } else if (seconds <= -4) {
      Vibration.vibrate([400]);
    } else if (seconds <= -10) {
      Vibration.vibrate([900]);
    }
  }, [seconds]);

  return (
    <SafeAreaView flex={1}>
      <View style={styles.container}>
        <FormControl isInvalid={false} alignItems={"center"} flex={1}>
          <Button
            onPress={() => {
              handleDanger();
              setSeconds(-11);
            }}
            style={{ width: 220, height: 220, backgroundColor: Colors.danger, marginTop: 96 }}
          >
            <Text style={{ fontSize: 48, lineHeight: 56, color: Colors.background }}>Segítség</Text>
          </Button>

          {seconds > 0 ? (
            <>
              <Text style={{ marginTop: "auto", fontSize: 16, color: Colors.locationButton }}>
                {status !== "PAUSED"
                  ? `Még ${seconds} másodperc a visszajelzésig`
                  : "Szünetelés. Bökj a folytatásra..."}
              </Text>
              <Button
                style={{
                  height: 56,
                  paddingLeft: 28,
                  paddingRight: 28,
                  backgroundColor: Colors.background,
                  borderColor: Colors.background,
                  borderWidth: "3",
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
                onPress={() => {
                  if (status === "DANGER") {
                    setNeedPin(true);
                    setAfterPin("onFine");
                  } else userFine();
                }}
                style={{
                  height: 56,
                  paddingLeft: 28,
                  paddingRight: 28,
                  backgroundColor: Colors.background,
                  borderColor: Colors.primary,
                  borderWidth: "3",
                  marginBottom: 64,
                }}
              >
                <Text style={{ color: Colors.text, fontWeight: "700" }}>Biztonságban vagyok</Text>
              </Button>
            </>
          )}

          <HStack width={"100%"} justifyContent={"center"} style={{ marginBottom: 32 }}>
            <Button
              onPress={() => {
                if (status === "DANGER") {
                  setNeedPin(true);
                  setAfterPin("onTripEnd");
                } else {
                  handleOnTripEnd();
                }
              }}
              style={{ width: "40%" }}
            >
              Hazaértem
            </Button>
            <Button
              onPress={() => {
                if (status === "DANGER") {
                  setNeedPin(true);
                  setAfterPin("onTripPause");
                } else if (status === "PAUSED") {
                  userFine();
                } else {
                  handleOnTripPause();
                }
              }}
              style={{ width: "40%" }}
            >
              {status !== "PAUSED" ? "Szünet" : "Folytatás"}
            </Button>
          </HStack>
        </FormControl>
        {needPin && (
          <Box
            position={"absolute"}
            width="100%"
            height="100%"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            background={Colors.background}
          >
            <Text style={{ fontSize: 18, marginBottom: 32, color: Colors.text }}>A folytatáshoz PIN kód szükséges</Text>
            <Animatable.View animation={error ? "bounce" : ""} delay={400}>
              <KeycodeInput
                onComplete={(value) => {
                  if (value === PINCODE) {
                    setNeedPin(false);
                    if (afterPin === "onTripPause") handleOnTripPause();
                    else if (afterPin === "onTripEnd") handleOnTripEnd();
                    else if (afterPin === "onFine") userFine();
                  } else {
                    setError(true);
                    setTimeout(() => setError(false), 500);
                    Vibration.vibrate(100);
                  }
                }}
              />
            </Animatable.View>
          </Box>
        )}
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
