import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Text, Button} from 'native-base';

export default function DangerScreen() {
    return (
        <View style={styles.container}>
          <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>
    
          <FormControl isInvalid = {false} w={{ base: "75%", md: "25%",}} alignItems={"center"}>
            <Text fontSize={"lg"} > I'm in danger {"\n"}</Text>

            <Button >I'm in danger</Button>
            <Button >Call me</Button>
            <Button >I'm home</Button>
            <Button >Pause</Button>
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
  