import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Input, Text} from 'native-base';

export default function AddContactScreen(props: any) {
    return (
        <View style={styles.container}>
          <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>
    
          <FormControl isInvalid = {false} w={{ base: "75%", md: "25%",}} alignItems={"center"}>
            <Text fontSize={"lg"} > ADD CONTACT {"\n"}</Text>
          </FormControl>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  