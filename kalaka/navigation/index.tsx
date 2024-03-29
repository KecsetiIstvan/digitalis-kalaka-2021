/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import ModalScreen from "../screens/modal/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabFollowScreen from "../screens/TabFollowScreen";
import TabMapScreen from "../screens/TabMapScreen";
import TabContactScreen from "../screens/TabContactsScreen";
import TabSettingsScreen from "../screens/TabSettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useEffect, useState } from "react";
import { getToken } from "../repository";
import ChatScreen from "../screens/ChatScreen";
import DangerScreen from "../screens/DangerScreen";
import AddContactScreen from "../screens/AddContactScreen";
import ChangeConatctModalScreen from "../screens/modal/ChangeContactModalScreen";
import PersonalDataModalScreen from "../screens/modal/PersonalDataModalScreen";
import SafetyFeaturesModalScreen from "../screens/modal/SafetyFeaturesModalScreen";
import NotificationsModalScreen from "../screens/modal/NotificationsModalScreen";
import TermdModalScreen from "../screens/modal/TermsModalScreen";
import FeedbackModalScreen from "../screens/modal/FeebackModalScreen";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { cp } from "fs";
import { Box } from "native-base";
import SplashScreenOnboardingScreen from "../screens/modal/SplashScreenOnboardingScreen";
import FeedbackModalScreen from "../screens/modal/FeedbackModalScreen";

export default function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const token = await getToken();
      setLoggedIn(token ? true : false);
    })();
  }, []);

  return loggedIn === false ? (
    <LoginScreen callback={setLoggedIn}></LoginScreen>
  ) : (
    <NavigationContainer linking={LinkingConfiguration}>
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
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Screen name="TabMap" component={TabMapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TabFollow" component={TabFollowScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TabContacts" component={TabContactScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TabSettings" component={TabSettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Danger"
        component={DangerScreen}
        options={{ headerShown: false }}
        initialParams={{ isLocationEnabled: false }}
      />
      <Stack.Screen name="AddContact" component={AddContactScreen} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="ChangeContactModal" component={ChangeConatctModalScreen} />
        <Stack.Screen name="PersonalDataModal" component={PersonalDataModalScreen} />
        <Stack.Screen name="SafetyFeaturesModal" component={SafetyFeaturesModalScreen} />
        <Stack.Screen
          name="SplashScreenOnboardingModal"
          options={{ title: "Hasznos tudnivalók" }}
          component={SplashScreenOnboardingScreen}
        />
        <Stack.Screen name="NotificationsModal" component={NotificationsModalScreen} />
        <Stack.Screen name="TermsModal" component={TermdModalScreen} />
        <Stack.Screen name="FeedbackModal" component={FeedbackModalScreen} />
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
      sceneContainerStyle={{backgroundColor: Colors.background}}
      initialRouteName="TabFollow"
      screenOptions={{
        tabBarStyle: {backgroundColor: Colors.secondaryTransparent},
      }}
    >
      <BottomTab.Screen
        name="TabFollow"
        component={TabFollowScreen}
        options={({ navigation }: RootTabScreenProps<"TabFollow">) => ({
          tabBarLabel: () => {return null},
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color;
            color = focused ? Colors.danger : Colors.primary
            return  <FontAwesome5
                      name="shoe-prints"
                      color={color}
                      size={25}
                      style={{ transform: [{ rotate: "269deg" }] }}
                    />
          },

         
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="info-circle" size={25} color={Colors.text} style={{ marginRight: 15 }} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabMap"
        component={TabMapScreen}
        options={{
          tabBarLabel: () => {return null},
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color;
            color = focused ? Colors.danger : Colors.primary
            return <FontAwesome5 name="map-marked-alt" color={color} size={25} />
          },
        }}
      />
      <BottomTab.Screen
        name="TabContacts"
        component={TabContactScreen}
        options={{
          tabBarLabel: () => {return null},
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color;
            color = focused ? Colors.danger : Colors.primary
            return <FontAwesome5 name="address-book" color={color} size={25} />
          },
        }}
      />
      <BottomTab.Screen
        name="TabSettings"
        component={TabSettingsScreen}
        options={{
          tabBarLabel: () => {return null},
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color;
            color = focused ? Colors.danger : Colors.primary
            return <FontAwesome5 name="cog" color={color} size={25} />
          }, 
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
