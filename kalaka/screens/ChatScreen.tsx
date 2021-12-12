import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FormControl, Image, View, Input, Text} from 'native-base';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import Colors from '../constants/Colors';

const customtInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        borderColor: "#E8E8E8",
        borderWidth: 1,
      }}
    />
  );
};

export default function ChatScreen(props: any) {
  const user = props.route.params.user;
  const [messages, setMessages] = React.useState<Array<any>>([]);

    React.useEffect(() => {
      setMessages([])
    }, [])

    const onSend = React.useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      setTimeout(() => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, [{
          _id: 1,
          text: 'Minden rendben! Köszi hogy aggódtál.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: user.firstName + ' ' + user.lastName,
            avatar: user.profileImageUrl,
          },
        }]))
      }, 2000)
    }, [])

    console.log(user)

    return (
      <>
        <View style={styles.container}>
          <Image source={{uri: user.profileImageUrl,}} style={styles.image} alt="Login page image" size="xl"/>
          <View>
            <Text fontSize={"lg"} style={styles.name}>{user.firstName + ' ' + user.lastName}</Text>
            {
              user.status === 'PAUSED' ? <Text fontSize={"xl"} bold style={styles.grayPill}> Szüneteltetve </Text> : 
                user.status === 'WALKING' ? <Text fontSize={"xl"} bold style={styles.primaryPill}> Biztonságban van </Text> :
                  <Text fontSize={"xl"} bold style={styles.dangerPill}> Veszélyben van </Text>
            }
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
          <GiftedChat messages={messages} onSend={messages => onSend(messages)} user={{_id: 1,}} renderInputToolbar={props => customtInputToolbar(props)}/>
        </View>
      </>);
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 80,
      height: 250,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: Colors.background 
    },
    image: {
      width: 160,
      height: 160,
      borderRadius: 80
    },
    name: {
      fontWeight: 'bold',
      fontSize: 24
    },
    grayPill: {
      backgroundColor: Colors.secondary,
      color: 'white',
      padding: 5,
      borderRadius: 10
    },
    primaryPill: {
      backgroundColor: Colors.primary,
      color: 'white',
      padding: 5,
      borderRadius: 10
    },
    dangerPill: {
      backgroundColor: Colors.danger,
      color: 'white',
      padding: 5,
      borderRadius: 10
    }
  });
  