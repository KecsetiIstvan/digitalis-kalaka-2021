import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Input, Text} from 'native-base';

export default function ChatScreen(props: any) {
    return (
        <View style={styles.container}>
          <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>
    
          <FormControl isInvalid = {false} w={{ base: "75%", md: "25%",}}>
            <Text fontSize={"lg"}> Tar Béla {"\n\n"}</Text>
            <Text fontSize={"xl"} bold> SAFE {"\n"}</Text>
    
            
            <Input placeholder="Chat message" type="text"/>

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
  