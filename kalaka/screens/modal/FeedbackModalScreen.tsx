import { StatusBar } from "expo-status-bar";
import { Box, Button, FormControl, Input, List, Select, TextArea } from "native-base";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function FeedbackModalScreen() {
  const [topic, setTopic] = React.useState("");

  return (
    <View style={styles.container}>
      <FormControl.Label>Email cím</FormControl.Label>
      <Input value={""} onChangeText={() => false} placeholder="" type="email" style={{ marginBottom: 16 }} />

      <Box style={{ marginBottom: 16 }}>
        <FormControl.Label>Téma</FormControl.Label>
        <Select selectedValue={topic} onValueChange={(itemValue) => setTopic(itemValue)}>
          <Select.Item label="Hiba visszajelzés" value="ux" />
          <Select.Item label="Új funkció igény" value="web" />
          <Select.Item label="Marketing" value="web" />
          <Select.Item label="Egyéb kérdésem van felétek" value="web" />
        </Select>
      </Box>

      <FormControl.Label>Üzenet</FormControl.Label>
      <TextArea style={{ marginBottom: 16 }}></TextArea>

      <Button>Küldés</Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    zIndex: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
