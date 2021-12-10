import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Button, Input, WarningOutlineIcon} from 'native-base';
import Toast from 'react-native-toast-message';
import { auth } from '../services';
import { setToken } from '../repository';


export default function LoginScreen(props: any) {
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [invalid, setInvalid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Létező email cím!');

  const handleEmailChange = (event: any) => {
    setEmail(event)
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event)
  }

  const handleLogin = async (event: any) => {
    const authenticationResponse = await auth(email, password);
    if(!authenticationResponse) {
      setPassword('');
      setEmail('');
      setInvalid(true);
      return;
    }

    await setToken(authenticationResponse.accessToken);
    props.callback(true)
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>

      <FormControl isInvalid = {invalid} w={{ base: "75%", md: "25%",}}>
        <FormControl.Label>Email cím</FormControl.Label>
        <Input value={email} onChangeText={handleEmailChange} placeholder="Email cím" type="email"/>

        <FormControl.Label>Jelszó</FormControl.Label>
        <Input value={password} onChangeText={handlePasswordChange} placeholder="Jelszó" type="password"/>

        <FormControl.Label>Jelszó megerősítése</FormControl.Label>
        <Input value={password} onChangeText={handlePasswordChange} placeholder="Jelszó megerősítése" type="password"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errorMessage}</FormControl.ErrorMessage>

        <Button onPress={handleLogin} disabled={!password || !email}>Regisztrálás</Button>
        <Button onPress={() => props.callback(true)}>Van már felhasználód? Jelentkezz be!</Button>

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
