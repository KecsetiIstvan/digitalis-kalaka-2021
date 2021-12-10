import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Button, Input, WarningOutlineIcon} from 'native-base';
import Toast from 'react-native-toast-message';

export default function LoginScreen(props: any) {
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [dirty, setDirty] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Please fill out the login form.');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value)
    setDirty(true);
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
    setDirty(true);
  }

  const handleLogin = (event: any) => {
    if(!dirty) {
      Toast.show({
        type: 'error',
        text1: 'Please fill out the login form.'
      });
      return;
    }

    // Login logic

    props.callback(true)
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>

      <FormControl isInvalid = {(!password || !email) && dirty} w={{ base: "75%", md: "25%",}}>
        <FormControl.Label>Email</FormControl.Label>
        <Input onChange={handleEmailChange} value={email} placeholder="Email address" type="email"/>

        <FormControl.Label>Password</FormControl.Label>
        <Input onChange={handlePasswordChange} value={password} placeholder="Enter password" type="password"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errorMessage}</FormControl.ErrorMessage>

        <Button onPress={handleLogin}>Sign in</Button>
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
