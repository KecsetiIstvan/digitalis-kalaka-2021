import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, Image, ScrollView, Button, Box } from "native-base";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getAll, getMap, me, frient, unfrient } from "../services";
import * as Animatable from "react-native-animatable";

function ContactListItem(params: {
  _id: string;
  imageUrl: string;
  lastName: string;
  firstName: string;
  status: string;
  active: boolean;
  refetch: () => void;
}): React.ReactElement {
  function isObject(obj: any) {
    return obj != null && obj.constructor.name === "Object";
  }

  const getNameInitials = (firstName: string, lastName: string) =>
    firstName && lastName ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : "";

  const meet = async (_id: any) => {
    if (params.active) await unfrient(params._id);
    else await frient(params._id);
    params.refetch();
  };

  return (
    <View style={styles.contactContainer}>
      <TouchableOpacity
        onPress={() => {
          meet(params._id);
        }}
      >
        {params.imageUrl && !isObject(params.imageUrl) ? (
          <Image
            style={{
              width: 120,
              height: 120,
              borderColor: params.active ? Colors.primary : Colors.secondaryTransparent,
              borderWidth: 5,
              borderRadius: 75,
            }}
            source={{ uri: params.imageUrl }}
            resizeMode={"cover"}
          />
        ) : (
          <Box
            style={{
              borderRadius: 100,
              backgroundColor: params.active ? Colors.primary : Colors.secondaryTransparent,
              width: 120,
              height: 120,
            }}
          >
            <Text
              style={{
                fontSize: 64,
                lineHeight: 130,
                color: params.active ? Colors.background : Colors.text,
                textAlign: "center",
              }}
            >
              {params.firstName && params.lastName ? getNameInitials(params.firstName, params.lastName) : "-"}
            </Text>
          </Box>
        )}

        <View style={params.active ? styles.activeNameContainer : styles.passiveContactNameContainer}>
          <Text style={params.active ? styles.activeName : styles.passiveContactName}>{params.lastName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function TabContactScreen({ navigation }: RootTabScreenProps<"TabContacts">) {
  const { data: meData, refetch } = useQuery("me", () => {
    return me();
  });

  const { data: allData } = useQuery("all", () => {
    return getAll();
  });

  const [populated, setPopulated] = React.useState([]);

  React.useEffect(() => {
    console.log(meData);
    if (allData && meData)
      setPopulated(
        allData
          ?.map((d: any) => {
            console.log(d);
            return {
              ...d,
              active: !!meData?.contacts.includes(d._id),
            };
          })
          .sort((x: any, y: any) => {
            if (x.active === y.active) return 0;
            if (x.active) return -1;
            return 1;
          })
      );
  }, [allData, meData]);

  const [emergencyContacts, setEmergencyContacts] = React.useState<Array<Object>>([]);

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 50 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Kontaktok</Text>
      </View>
      <ScrollView
        _contentContainerStyle={{ w: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}
      >
        <View style={styles.subHeaderTextContainer}>
          <Text style={styles.subHeaderText}>Ismerősök</Text>
        </View>
        {populated?.map((contact: any) => (
          <ContactListItem
            _id={contact._id}
            imageUrl={contact.profileImageUrl}
            firstName={contact.firstName}
            lastName={contact.lastName}
            status={contact.status}
            active={contact.active}
            refetch={refetch}
          ></ContactListItem>
        ))}

        <View style={{ ...styles.subHeaderTextContainer, ...{ marginBottom: 15 } }}>
          <Text style={styles.subHeaderText}>Biztonsági személyek</Text>
        </View>

        <Button style={styles.activeBadge}>Édesanyám</Button>
        <Button style={styles.passiveBadge} _text={{ color: Colors.text }}>
          Tesókám
        </Button>
        <Button style={styles.activeBadge}>Édesapám</Button>
        <Button style={styles.activeBadge}>Kicsikutyám</Button>
      </ScrollView>
      <Button style={styles.addContactButton}>Biztonsági kontaktok</Button>
    </SafeAreaView>
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
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryTransparent,
    height: 60,
    width: "50%",
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  subHeaderTextContainer: {
    width: "90%",
    paddingVertical: 10,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
  },
  subHeaderText: {
    color: Colors.secondary,
    fontSize: 16,
  },
  contactContainer: {
    width: 130,
    height: 130,
    marginHorizontal: 25,
    marginVertical: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  passiveContactImage: {
    width: 130,
    height: 130,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: Colors.secondaryTransparent,
  },
  activeImage: {
    width: 130,
    height: 130,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: Colors.primary,
  },
  activeNameContainer: {
    backgroundColor: Colors.primary,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
    padding: 5,
  },
  passiveImage: {
    width: 140,
    height: 140,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: Colors.secondaryTransparent,
  },
  passiveContactNameContainer: {
    backgroundColor: Colors.secondaryTransparent,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
    padding: 5,
  },
  activeName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  passiveContactName: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },
  addContactButton: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  activeBadge: {
    width: "40%",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  passiveBadge: {
    width: "40%",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryTransparent,
    color: Colors.text,
  },
});
