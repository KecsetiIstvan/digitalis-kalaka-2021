import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base'
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { deleteToken } from '../repository';

export default function TabFollowScreen({ navigation }: RootTabScreenProps<'TabSettings'>) {
  const handleLogOut = async () => {
    await deleteToken();
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button onPress={handleLogOut}>Log out</Button>
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
