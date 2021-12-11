import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Image, ScrollView, Button } from 'native-base';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';

function ContactListItem(params: {imageUrl: string, lastName: string, active: boolean}): React.ReactElement {
  return (
    <View style={styles.contactContainer }>
      <Image style={params.active === true ? styles.activeImage : styles.passiveContactImage } source={{uri: params.imageUrl}} size={"xl"}/>
      <View style={params.active === true ? styles.activeNameContainer : styles.passiveContactNameContainer}>
        <Text style={params.active === true ? styles.activeName : styles.passiveContactName}>{params.lastName}</Text>
      </View>
    </View>
  );
}

export default function TabContactScreen({ navigation }: RootTabScreenProps<'TabContacts'>) {


  const [emergencyContacts, setEmergencyContacts] = React.useState<Array<Object>>([]);



  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 50}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Kontaktok</Text>
      </View>
      <ScrollView _contentContainerStyle={{w: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
        <View style={styles.subHeaderTextContainer}>
          <Text style={styles.subHeaderText}>Ismerőseid az app-ban</Text>
        </View>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={false}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>
        <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' active={true}></ContactListItem>

        <View style={{...styles.subHeaderTextContainer, ...{marginBottom: 15}}}>
          <Text style={styles.subHeaderText}>Biztonsági kontaktok</Text>
        </View>

        <Button style={styles.activeBadge}>Édesanyám</Button>
        <Button style={styles.passiveBadge} _text={{color: Colors.text,}}>Tesókám</Button>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryTransparent,
    height: 60,
    width: '50%',
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize:20
  },
  subHeaderTextContainer: {
    width: '90%',
    paddingVertical: 10,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1
  },
  subHeaderText: {
    color: Colors.secondary,
    fontSize:16,
  },
  contactContainer: {
    width: 140,
    height: 140,
    marginHorizontal: 25,
    marginVertical: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  passiveContactImage: {
    width: 140,
    height: 140,
    borderRadius:80,
    borderWidth: 5,
    borderColor: Colors.secondaryTransparent
  },
  activeImage: {
    width: 140,
    height: 140,
    borderRadius:80,
    borderWidth: 5,
    borderColor: Colors.primary
  },
  activeNameContainer: {
    backgroundColor: Colors.primary,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    padding: 5
  },
  passiveImage: {
    width: 140,
    height: 140,
    borderRadius:80,
    borderWidth: 5,
    borderColor: Colors.secondaryTransparent
  },
  passiveContactNameContainer: {
    backgroundColor: Colors.secondaryTransparent,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    padding: 5
  },
  activeName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  passiveContactName: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 16
  },
  addContactButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  activeBadge: {
    width: '40%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary
  },
  passiveBadge: {
    width: '40%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryTransparent,
    color: Colors.text
  }
});
  