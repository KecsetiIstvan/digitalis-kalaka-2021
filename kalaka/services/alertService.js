import SmsAndroid from 'react-native-get-sms-android';
import { me, getContact } from './index'; 
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export const alertContacts = async() => {
    const loggedInUser = await me();
    const phoneNumbers = [];
    loggedInUser.emergencyContacts.forEach(contact =>  {phoneNumbers.push(contact.emergencyInfo)})

    for(let c of loggedInUser.contacts) {
      const contact = await getContact(c);
      phoneNumbers.push(contact.phone)
    }
    let message = `Bajban vagyok! Kérlek segíts, sajnos nem tudni az utolsó pozicióm!`;
    if(loggedInUser.location) {
      const lon = loggedInUser.location.longitude;
      const lat = loggedInUser.location.latitude;
      const timeStamp = loggedInUser.location.updatedAt;
      message = `Bajban vagyok! Kérlek segíts, utolsó rögzített pozicióm: https://www.google.com/maps/search/?api=1&query=${lat},${lon} , ekkor: ${timeStamp}!`;
    }
    
    phoneNumbers.forEach(phoneNumber => {
        SmsAndroid.autoSend(
            phoneNumber,
            message,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
          );
    })
    try {
      await RNImmediatePhoneCall.immediatePhoneCall(phoneNumber[0]);
    } catch (e) {
      console.log(e);
    }
}


export const falseAlarm = async() => {
  const loggedInUser = await me();
  const phoneNumbers = [];
  loggedInUser.emergencyContacts.forEach(contact =>  {phoneNumbers.push(contact.emergencyInfo)})

  for(let c of loggedInUser.contacts) {
    const contact = await getContact(c);
    phoneNumbers.push(contact.phone)
  }
  
  phoneNumbers.forEach(phoneNumber => {
      SmsAndroid.autoSend(
          phoneNumber,
          `Elnézést az előző egy téves riasztás volt, minden rendben, köszi hogy aggódtál értem!`,
          (fail) => {
            console.log('Failed with this error: ' + fail);
          },
          (success) => {
            console.log('SMS sent successfully');
          },
        );
  })
}