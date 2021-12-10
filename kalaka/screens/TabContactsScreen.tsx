import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View} from '../components/Themed';
import { Button } from 'native-base';
import { RootTabScreenProps } from '../types';

export default function TabContactScreen({ navigation }: RootTabScreenProps<'TabContacts'>) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Contacts</Text>
      
        <Button onPress={() => navigation.navigate("AddContact")}>Add contact</Button>
        <Button onPress={() => navigation.navigate("ChangeContactModal")}>Change contact</Button>
        <Button onPress={() => navigation.navigate("Chat")}>Chat</Button>
      </View>
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
  });
  