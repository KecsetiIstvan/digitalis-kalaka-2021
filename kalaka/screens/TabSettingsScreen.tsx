import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { Box, List, Text, Icon } from "native-base";
import { RootTabScreenProps } from "../types";
import { deleteToken } from "../repository";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { me } from "../services";

export default function TabFollowScreen({ navigation }: RootTabScreenProps<"TabSettings">) {
  const { data: meData, refetch } = useQuery("me", () => me());

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogOut = async () => {
    await deleteToken();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const getNameInitials = (firstName: string, lastName: string) =>
    firstName && lastName ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : "";

  return (
    <SafeAreaView>
      <Box w="100%">
        <List width="100%" borderBottomWidth="0">
          <List.Item marginBottom={16} marginLeft={2} marginTop={4} display={"flex"}>
            {meData?.profileImageUrl ? (
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 75,
                }}
                source={{ uri: "https://picsum.photos/60/60.jpg" }}
                resizeMode={"cover"}
              />
            ) : (
              <Box
                style={{
                  borderRadius: "100px",
                  backgroundColor: "#6165F3",
                  width: 60,
                  height: 60,
                }}
              >
                <Text style={styles.initial}>{meData ? getNameInitials(meData.firstName, meData.lastName) : "-"}</Text>
              </Box>
            )}
            <Text style={styles.text}>{`${meData?.firstName} ${meData?.lastName}`}</Text>
          </List.Item>
          <List.Item onPress={() => navigation.navigate("PersonalDataModal")}>
            <Text style={styles.text}>Személyes adatok modósítása</Text>
          </List.Item>
          <List.Item onPress={() => navigation.navigate("SafetyFeaturesModal")}>
            <Text style={styles.text}>Biztonsági beállítások</Text>
          </List.Item>
          <List.Item onPress={() => navigation.navigate("NotificationsModal")}>
            <Text style={styles.text}>Értesítések</Text>
          </List.Item>
          <List.Item onPress={() => navigation.navigate("TermsModal")}>
            <Text style={styles.text}>Felhasználói feltételek</Text>
          </List.Item>
          <List.Item onPress={handleLogOut}>
            <Text style={styles.text} color="red.500">
              Kijelentkezés
            </Text>
          </List.Item>
        </List>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    padding: 15,
    fontSize: 15,
  },
  initial: {
    fontSize: 26,
    lineHeight: 72,
    color: "#ffffff",
    textAlign: "center",
  },
});
