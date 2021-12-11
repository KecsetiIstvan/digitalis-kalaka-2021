import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Button, Input, WarningOutlineIcon} from 'native-base';
import Toast from 'react-native-toast-message';
import { auth, register } from '../services';
import { setToken } from '../repository';


export default function LoginScreen(props: any) {
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [invalid, setInvalid] = React.useState(false);
  const [formState, setFormState] = React.useState('login');
  const [registrationPassword, setRegistrationPassword] = React.useState<string>('');
  const [registrationPassword2, setRegistrationPassword2] = React.useState<string>('');
  const [registrationEmail, setRegistrationEmail] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');

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

  const handleRegistration = async (event: any) => {
    if(registrationPassword !== registrationPassword2) {
      Toast.show({
        type: 'error',
        text1: 'A jelszavak nem egyeznek!'
      })
      return;
    }

    const authenticationResponse = await register(registrationEmail, registrationPassword, firstName, lastName);

    if(!authenticationResponse) {
      setRegistrationEmail('');
      setRegistrationPassword('');
      setRegistrationPassword2('');
      setFirstName('');
      setLastName('');
      setInvalid(true);
      return;
    }

    const loginResponse = await auth(registrationEmail, registrationPassword);
    if(!loginResponse) {
      setRegistrationEmail('');
      setRegistrationPassword('');
      setRegistrationPassword2('');
      setFirstName('');
      setLastName('');
      setInvalid(true);
      return;
    }

    await setToken(loginResponse.accessToken);

    Toast.show({
      type: 'success',
      text1: 'Sikeres regisztráció!'
    })

    props.callback(true)
  }


  const loginScreen = (
    <View style={styles.container}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>

      <FormControl isInvalid = {invalid} w={{ base: "75%", md: "25%",}}>
        <FormControl.Label>Email cím</FormControl.Label>
        <Input value={email} onChangeText={handleEmailChange} placeholder="Email cím" type="email"/>

        <FormControl.Label>Jelszó</FormControl.Label>
        <Input value={password} onChangeText={handlePasswordChange} placeholder="Jelszó" type="password"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Az email cím és a jelszó nem egyezik!</FormControl.ErrorMessage>

        <Button onPress={handleLogin} disabled={!password || !email}>Bejelentkezés</Button>
        <Button onPress={() => props.callback(true)}>Bejelentkezés google használatával</Button>
        <Button onPress={() => setFormState('registrant')}>Regisztráció</Button>
        

      </FormControl>
    </View>
  ); 

  const registerScreen = (
    <View style={styles.container}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Login page image" size="xl"/>

      <FormControl isInvalid = {invalid} w={{ base: "75%", md: "25%",}}>
        <FormControl.Label>Email cím</FormControl.Label>
        <Input value={registrationEmail} onChangeText={(event) => setRegistrationEmail(event)} placeholder="Email cím" type="email"/>

        <FormControl.Label>Jelszó</FormControl.Label>
        <Input value={registrationPassword} onChangeText={(event) => setRegistrationPassword(event)} placeholder="Jelszó" type="password"/>

        <FormControl.Label>Jelszó megerősítése</FormControl.Label>
        <Input value={registrationPassword2} onChangeText={(event) => setRegistrationPassword2(event)} placeholder="Jelszó megerősítése" type="password"/>

        <FormControl.Label>Vezetéknév</FormControl.Label>
        <Input value={firstName} onChangeText={(event) => setFirstName(event)} placeholder="Vezetéknév" type="text"/>

        <FormControl.Label>Keresztnév</FormControl.Label>
        <Input value={lastName} onChangeText={(event) => setLastName(event)} placeholder="Keresztnév" type="text"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Nem sikerült a regisztráció!</FormControl.ErrorMessage>

        <Button onPress={handleRegistration} disabled={!registrationPassword || !registrationPassword2 || !registrationEmail}>Regisztrálás</Button>
        <Button onPress={() => setFormState('login')}>Van már felhasználód? Jelentkezz be!</Button>

      </FormControl>
    </View>
  );

  return (formState === 'login' ? loginScreen : registerScreen);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
