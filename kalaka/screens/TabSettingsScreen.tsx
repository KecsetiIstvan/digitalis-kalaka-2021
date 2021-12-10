import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Box, List, Text, Icon } from 'native-base'
import { RootTabScreenProps } from '../types';
import { deleteToken } from '../repository';
import PersonalDataModalScreen from './modal/PersonalDataModalScreen';

export default function TabFollowScreen({ navigation }: RootTabScreenProps<'TabSettings'>) {
  const handleLogOut = async () => {
    await deleteToken();
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}],
    })
  }
  return (
    <Box w="100%" >
      <List width="100%" borderBottomWidth='0'>
        <List.Item  onPress={() => navigation.navigate("PersonalDataModal")}>
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
        <List.Item  onPress={handleLogOut}>
          <Text style={styles.text} color="red.500">Kijelentkezés</Text>
        </List.Item>
      </List>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    padding: 15,
    fontSize: 15,
  },
});
