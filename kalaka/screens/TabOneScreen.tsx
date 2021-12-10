import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useQuery } from 'react-query';
import { me } from '../services';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const query = useQuery('me', () => { me(); });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{query.data}</Text>
      <Button onPress={() => me()}>Primary</Button>
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
