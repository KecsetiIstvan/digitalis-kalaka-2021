import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Button, Input, WarningOutlineIcon, Text, Divider, ScrollView} from 'native-base';
import Toast from 'react-native-toast-message';
import { auth, register } from '../services';
import { setToken } from '../repository';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';


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
  const [phone, setTelephonNumber] = React.useState<string>('');

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

    const authenticationResponse = await register(registrationEmail, registrationPassword, firstName, lastName, phone);

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
      <Image style={styles.image} source={require('../assets/images/icon.png')} alt="Login page image"/>

      <FormControl style={styles.containerForm} isInvalid = {invalid} w={{ base: "75%", md: "25%",}}>
        <Input  value={email} onChangeText={handleEmailChange} placeholder="Email cím" type="email"/>

        <Input value={password} onChangeText={handlePasswordChange} placeholder="Jelszó" type="password"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Az email cím és a jelszó nem egyezik!</FormControl.ErrorMessage>

        <Button onPress={handleLogin} disabled={!password || !email} marginTop={10}>Bejelentkezés</Button>
        <Button onPress={() => props.callback(true)}>Bejelentkezés google használatával</Button>

        <Divider thickness={3} marginTop={10}/>

        <Text style={{color: Colors.primary, fontSize: 20}} marginTop={5}>Először vagy itt?</Text>

        <Button onPress={() => setFormState('registrant')}>Regisztráció</Button>
        

      </FormControl>
    </View>
  ); 

  const registerScreen = (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image1} source={require('../assets/images/knigth.png')} alt="Register page image"/>
      </View>
      <ScrollView _contentContainerStyle={{w: "100%", flexDirection: "row"}}>
      <View style={{width: "100%", alignItems: 'center'}}>
      <FormControl style={styles.containerForm} isInvalid = {invalid} w={{ base: "75%", md: "25%",}}>
        
        <Input value={firstName} onChangeText={(event) => setFirstName(event)} placeholder="Vezetéknév" type="text"/>

        <Input value={lastName} onChangeText={(event) => setLastName(event)} placeholder="Keresztnév" type="text"/>

        <Input value={phone} onChangeText={(event) => setTelephonNumber(event)} placeholder="Telefonszám" type="number"/>

        <Input value={registrationEmail} onChangeText={(event) => setRegistrationEmail(event)} placeholder="Email cím" type="email"/>

        <Input value={registrationPassword} onChangeText={(event) => setRegistrationPassword(event)} placeholder="Jelszó" type="password"/>

        <Input value={registrationPassword2} onChangeText={(event) => setRegistrationPassword2(event)} placeholder="Jelszó megerősítése" type="password"/>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Nem sikerült a regisztráció!</FormControl.ErrorMessage>

        <Button onPress={handleRegistration} disabled={!registrationPassword || !registrationPassword2 || !registrationEmail}>Regisztrálok</Button>
        
        <Button onPress={() => props.callback(true)}>Bejelentkezem Google-al</Button>

        <Divider thickness={3} marginTop={10}/>

        <Text style={{color: Colors.primary, fontSize: 20}} marginTop={5}>Van már felhasználód?</Text>
        
        <Button onPress={() => setFormState('login')}>Jelentkezz be!</Button>

      </FormControl>
      </View>
      </ScrollView>
    </SafeAreaView>
  );

  return (formState === 'login' ? loginScreen : registerScreen);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerForm: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  image1:{ 
    flex: 1,
    aspectRatio: 2, 
    resizeMode: 'contain',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.secondaryTransparent,
    height: 60,
    width: '100%',
  },
  headerText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize:20
  },
});
