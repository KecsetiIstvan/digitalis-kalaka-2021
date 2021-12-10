import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Button, Input, WarningOutlineIcon} from 'native-base';

export default function LoginScreen(props: any) {
  const [password, setPassword] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [dirty, setDirty] = React.useState(false);

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>

      <FormControl isInvalid = {!password || !email} w={{ base: "75%", md: "25%",}}>
        <FormControl.Label>Email</FormControl.Label>
        <Input placeholder="Email address" type="email"/>

        <FormControl.Label>Password</FormControl.Label>
        <Input placeholder="Enter password" type="password"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Password or email address is invalid.
        </FormControl.ErrorMessage>

        <Button onPress={() => props.callback(true)}>Sign in</Button>
        <Button onPress={() => props.callback(true)}>Or sign in with google</Button>
        <Button onPress={() => props.callback(true)}>Sign up</Button>

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
