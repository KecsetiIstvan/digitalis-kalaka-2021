import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Image, ScrollView, Button } from 'native-base';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

function ContactListItem(params: {imageUrl: string, lastName: string, contactType: string}): React.ReactElement {
  return (
    <View style={styles.contactContainer }>
      <Image style={params.contactType === 'emergency' ? styles.emergencyImage : styles.contactImage } source={{uri: params.imageUrl}} size={"xl"}/>
      <View style={params.contactType === 'emergency' ? styles.emergencyNameContainer : styles.contactNameContainer}>
        <Text style={styles.contactName}>{params.lastName}</Text>
      </View>
    </View>
  );
}

export default function TabContactScreen({ navigation }: RootTabScreenProps<'TabContacts'>) {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Kontaktok</Text>
        </View>
        <ScrollView _contentContainerStyle={{w: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='contact'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='contact'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='emergency'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='contact'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='contact'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='contact'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='emergency'></ContactListItem>
          <ContactListItem imageUrl='https://wallpaperaccess.com/full/317501.jpg' lastName='Laura' contactType='contact'></ContactListItem>
        </ScrollView>
        <Button>Kontakt hozzáadása</Button>
      </>
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
    paddingTop: 20,
    height: 60,
    width: '50%',
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize:20
  },
  contactContainer: {
    width: 160,
    height: 160,
    marginHorizontal:10,
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  contactImage: {
    width: 160,
    height: 160,
    borderRadius:80,
    borderWidth: 5,
    borderColor: Colors.primary
  },
  contactNameContainer: {
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
  emergencyImage: {
    width: 160,
    height: 160,
    borderRadius:80,
    borderWidth: 5,
    borderColor: Colors.danger
  },
  emergencyNameContainer: {
    backgroundColor: Colors.danger,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    padding: 5
  },
  contactName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
  