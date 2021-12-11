import * as React from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Box, List, Text, Spinner, Button } from "native-base";
import { RootTabScreenProps } from "../types";
import { deleteToken } from "../repository";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from '../constants/Colors';
import { useQuery } from "react-query";
import { me, updateMe, uploadImage } from "../services";
import * as ImagePicker from "expo-image-picker";
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

  function isObject(obj: any) {
    return obj != null && obj.constructor.name === "Object";
  }

  return (
    <SafeAreaView >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Beállítások</Text>
      </View>
      <Box w="100%">
          <List.Item marginBottom={8} marginLeft={2} marginTop={4} display={"flex"}>
            <TouchableOpacity onPress={() => handleImageUpload()}>
              {console.log(meData)}
              {meData?.profileImageUrl && !isObject(meData?.profileImageUrl) ? (
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
            <Text style={styles.name}>{`${meData?.firstName} ${meData?.lastName}`}</Text>
          </List.Item>
            <Button variant="outline" onPress={() => navigation.navigate("PersonalDataModal")}>
              Személyes adatok modósítása
              <FontAwesome5 style={{color: Colors.primary}} name="chevron-right"/>
            </Button>
            <Button display='flex' flexDirection='row' variant="outline" onPress={() => navigation.navigate("SafetyFeaturesModal")}>
              <Text style={{marginRight: 'auto'}}>Biztonsági beállítások</Text>
              <FontAwesome5 style={{color: Colors.primary}} name="chevron-right"/>
            </Button>
            <Button variant="outline" onPress={() => navigation.navigate("NotificationsModal")}>
              Értesítések
              <FontAwesome5 style={{color: Colors.primary}} name="chevron-right"/>
            </Button>
            <Button variant="outline" onPress={() => navigation.navigate("TermsModal")}>
              Felhasználói feltételek
              <FontAwesome5 style={{color: Colors.primary}} name="chevron-right"/>
            </Button>
            <Button variant="logout" onPress={handleLogOut}>
              Kijelentkezés
              <FontAwesome5 style={{color: Colors.danger}} name="chevron-right"/>
            </Button>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    padding: 15,
    fontSize: 16,
  },
  text: {
    padding: 15,
    fontSize: 14,
  },
  initial: {
    fontSize: 26,
    lineHeight: 72,
    color: "#ffffff",
    textAlign: "center",
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondaryTransparent, 
    height: 60,
    width: '50%',
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize:20,
  },
  listItem: {
    alignSelf: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 100,
    width: "90%",
    marginTop: 15,
  },
});
