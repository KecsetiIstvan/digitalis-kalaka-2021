import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Box, List, Text, View, StatusBar } from 'native-base'
import { RootTabScreenProps } from '../types';
import { deleteToken } from '../repository';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabFollowScreen({ navigation }: RootTabScreenProps<'TabSettings'>) {
  const handleLogOut = async () => {
    await deleteToken();
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}],
    })
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Beállítások</Text>
      </View>
      <Box w="100%" >
        <List width="100%" borderBottomWidth='0' borderTopWidth='0'>
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
    </SafeAreaView>
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
});
