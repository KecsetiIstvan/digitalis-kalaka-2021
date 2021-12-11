import SmsAndroid from 'react-native-get-sms-android';
import { me } from './index'; 
export const alertContacts = async() => {
    const loggedInUser = await me();
    const phoneNumbers = [];
    loggedInUser.emergencyContacts.forEach(contact =>  {phoneNumbers.push(contact.emergencyInfo)})
    
    console.log(phoneNumbers)
    const lon = loggedInUser.location.longitude;
    const lat = loggedInUser.location.latitude;
    const timeStamp = loggedInUser.location.updatedAt;
    /*
    phoneNumbers.forEach(phoneNumber => {
        SmsAndroid.autoSend(
            phoneNumber,
            `Bajban vagyok! Kérlek segíts, utolsó rögzített pozicióm: https://www.google.com/maps/search/?api=1&query=${lat},${lon} , ekkor: ${timeStamp}!`,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
          );
    })
   */
}