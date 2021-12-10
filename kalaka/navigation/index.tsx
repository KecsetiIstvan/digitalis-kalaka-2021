/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabFollowScreen from '../screens/TabFollowScreen';
import TabMapScreen from '../screens/TabMapScreen';
import TabContactScreen from '../screens/TabContactsScreen';
import TabSettingsScreen from '../screens/TabSettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useEffect, useState } from 'react';
import { getToken } from '../repository';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const token = await getToken();
      setLoggedIn(token ? true : false);
    })();
    
  }, []);

  return (
    loggedIn === false ? 
    <LoginScreen callback={setLoggedIn}></LoginScreen> 
    :
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Screen name="TabMap" component={TabMapScreen} options={{headerShown: false}}/>
      <Stack.Screen name="TabFollow" component={TabFollowScreen} options={{headerShown: false}}/>
      <Stack.Screen name="TabContacts" component={TabContactScreen} options={{headerShown: false}}/>
      <Stack.Screen name="TabSettings" component={TabSettingsScreen} options={{headerShown: false}}/> */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabFollow"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}>
      <BottomTab.Screen
        name="TabMap"
        component={TabMapScreen}
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFollow"
        component={TabFollowScreen}
        options={({ navigation }: RootTabScreenProps<'TabFollow'>) => ({
          title: 'Follow',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabContacts"
        component={TabContactScreen}
        options={{
          title: "Contacts",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabSettings"
        component={TabSettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
