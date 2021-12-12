import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Box, Heading, Stagger } from "native-base";
import * as React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

export default function SplashScreenOnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [step, setStep] = React.useState(1);

  return (
    <View style={styles.container}>
      {step === 1 && (
        <Stagger
          flex={1}
          visible={step === 1}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 0,
          }}
        >
          <Box flex={1} paddingX="6" paddingTop="6">
            <Heading color={Colors.primary} fontSize={26} fontWeight="bold" paddingBottom={8}>
              Figyelj rám
            </Heading>
            <Text color={Colors.text} fontWeight="500" fontSize={16} paddingTop="16">
              Ezzel a lehetőséggel egy szimulált telefonhívásba vehetsz részt, amiben az általad megadott időközönként
              beleszólva megerősítheted, hogy minden rendben van. Amennyiben ez nem történik meg, vagy pedig a szintén
              általad beadott biztonsági kódot mondod be, értesítjük kiválasztott kontaktjaidat arról, hogy veszélyben
              vagy. Ha engedélyezted, hogy hozzáférjünk a helyadataidhoz, a kontakt személyeid mindeközben
              végigkövethetik az utadat a térképen.
            </Text>
            <Box flex={1} justifyContent="center" alignItems="center">
              <FontAwesome5 name="microphone" size={128} color={Colors.textTransparent} style={{ marginRight: 0 }} />
              {/*<Image source={require("../../assets/images/onboarding-1-1.png")} style={styles.img} />*/}
            </Box>
          </Box>
        </Stagger>
      )}
      {step === 2 && (
        <Stagger
          flex={1}
          visible={step === 2}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 0,
          }}
        >
          <Box flex={1} paddingX="6" paddingTop="6">
            <Heading color={Colors.primary} fontSize={26} fontWeight="bold" paddingBottom={8}>
              Fogd a kezem
            </Heading>
            <Text color={Colors.text} fontWeight="500" fontSize={16} paddingTop="16">
              Ha az általad megadott időközönként megnyomod a “Biztonságban vagyok” gombot, tudni fogjuk, hogy minden
              rendben van az utad során, amennyiben ez nem történik meg értesítjük a megadott kontakszemélyeidet.
              Amennyiben engedélyezted, hogy hozzáférjünk a helyadataidhoz, a kontaktszemélyed végigkövetheti az utadat,
              a térképen.
            </Text>
            <Box flex={1} justifyContent="center" alignItems="center">
              <Box style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5 name="map-marker" size={128} color={Colors.locationButton} style={{ marginRight: 0 }} />
                <FontAwesome5
                  solid
                  name="circle"
                  size={54}
                  color={Colors.background}
                  style={{ position: "absolute", marginLeft: 0, paddingBottom: 30 }}
                />
              </Box>
              {/*<Image source={require("../../assets/images/onboarding-1-1.png")} style={styles.img} />*/}
            </Box>
          </Box>
        </Stagger>
      )}
      {step === 3 && (
        <Stagger
          flex={1}
          visible={step === 3}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 0,
          }}
        >
          <Box flex={1} paddingX="6" paddingTop="6">
            <Heading color={Colors.primary} fontSize={26} fontWeight="bold" paddingBottom={8}>
              Gyere velem
            </Heading>
            <Text color={Colors.text} fontWeight="500" fontSize={16} paddingTop="16">
              Ha ezt a lehetőséget választod a megadott kontaktjaid valós időben követhetik utadat, a térképen.
            </Text>
            <Box flex={1} justifyContent="center" alignItems="center">
              <FontAwesome5 solid name="hand-paper" size={128} color={Colors.primary} style={{ marginRight: 0 }} />
              {/*<Image source={require("../../assets/images/onboarding-1-1.png")} style={styles.img} />*/}
            </Box>
          </Box>
        </Stagger>
      )}
      <Box alignItems="center">
        <Box flexDirection="row">
          <Box width="6px" height="6px" borderRadius="6px" bg={step === 1 ? "#53267c" : "#ccc8d0"} marginRight="8px" />
          <Box width="6px" height="6px" borderRadius="6px" bg={step === 2 ? "#53267c" : "#ccc8d0"} marginRight="8px" />
          <Box width="6px" height="6px" borderRadius="6px" bg={step === 3 ? "#53267c" : "#ccc8d0"} />
        </Box>
        <Box paddingTop="4" paddingBottom="16">
          {step === 1 && (
            <TouchableOpacity onPress={() => setStep(2)}>
              <Text style={{ fontSize: 22 }}>Tovább</Text>
            </TouchableOpacity>
          )}
          {step === 2 && (
            <TouchableOpacity onPress={() => setStep(3)}>
              <Text style={{ fontSize: 22 }}>Tovább</Text>
            </TouchableOpacity>
          )}
          {step === 3 && (
            <TouchableOpacity
              onPress={async () => {
                navigation.pop(1);
              }}
            >
              <Text style={{ fontSize: 22 }}>Befejezés</Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
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
