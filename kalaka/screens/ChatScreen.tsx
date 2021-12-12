import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Input, Text} from 'native-base';

export default function ChatScreen(props: any) {
  const user = props.route.params.user;
    return (
        <View style={styles.container}>
          <Image source={{uri: user.profileImageUrl,}} alt="Login page image" size="xl"/>
    
          <FormControl isInvalid = {false} w={{ base: "75%", md: "25%",}} alignItems={"center"}>
            <Text fontSize={"lg"}>{'asd'}</Text>
            <Text fontSize={"xl"} bold> SAFE {"\n"}</Text>
    
            
            <Input placeholder="Chat message" type="text"  w={{base: "100%", md: "25%",}}/>

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
  