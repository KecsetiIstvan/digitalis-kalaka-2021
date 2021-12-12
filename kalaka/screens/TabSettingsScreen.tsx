import * as React from "react";
import { StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import { Box, List, Text, Icon, Spinner, HStack } from "native-base";
import { RootTabScreenProps } from "../types";
import { deleteToken } from "../repository";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { me, updateMe, uploadImage } from "../services";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabFollowScreen({ navigation }: RootTabScreenProps<"TabSettings">) {
  const { data: meData, refetch } = useQuery("me", () => me());
  const [isLoadingImage, setIsLoadingImage] = React.useState(false);

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

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    setIsLoadingImage(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const uploadedImage = await uploadImage(`data:image/jpeg;base64,${result.base64}`);
      try {
        await updateMe({ profileImageUrl: uploadedImage.data.image.url });
        await refetch();
        setIsLoadingImage(false);
      } catch {
        console.log("error");
        setIsLoadingImage(false);
      }
    }
    setIsLoadingImage(false);
  };

  const getNameInitials = (firstName: string, lastName: string) =>
    firstName && lastName ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : "";

  return (
    <SafeAreaView>
      <Box w="100%">
        <List width="100%" borderBottomWidth="0">
          <List.Item marginBottom={16} marginLeft={2} marginTop={4} display={"flex"}>
            <TouchableOpacity onPress={() => handleImageUpload()}>
              {meData?.profileImageUrl && !isLoadingImage ? (
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 75,
                  }}
                  source={{ uri: meData?.profileImageUrl }}
                  resizeMode={"cover"}
                />
              ) : (
                <Box
                  style={{
                    borderRadius: 100,
                    backgroundColor: "#6165F3",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isLoadingImage ? (
                    <Spinner color={Colors.secondary} />
                  ) : (
                    <Text style={styles.initial}>
                      {meData ? getNameInitials(meData.firstName, meData.lastName) : "-"}
                    </Text>
                  )}
                </Box>
              )}
            </TouchableOpacity>
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
          <List.Item onPress={() => navigation.navigate("FeedbackModal")}>
            <Text style={styles.text}>Visszajelzés a fejlesztőknek</Text>
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
