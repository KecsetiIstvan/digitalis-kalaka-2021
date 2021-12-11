import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Image, ScrollView } from 'native-base';
import { RootTabScreenProps } from '../types';

function ContactListItem(): React.ReactElement {
  return (
    <View style={styles.contactContainer}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}}size={"xl"}/>
      <Text style={styles.title}>Contacts</Text>
    </View>
  );
}

export default function TabContactScreen({ navigation }: RootTabScreenProps<'TabContacts'>) {
    return (
      <ScrollView _contentContainerStyle={{w: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
        <ContactListItem></ContactListItem>
      </ScrollView>
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
  contactContainer: {
    width: 160,
    height: 160,
    marginHorizontal:10,
    marginVertical: 10,
    backgroundColor:'red'
  }
});
  