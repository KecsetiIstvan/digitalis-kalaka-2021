/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { Box } from "native-base";
import FeedbackModalScreen from "../screens/modal/FeebackModalScreen";

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
      initialRouteName="TabFollow"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <BottomTab.Screen
        name="TabFollow"
        component={TabFollowScreen}
        options={({ navigation }: RootTabScreenProps<"TabFollow">) => ({
          title: "Követés",
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome5
              name="shoe-prints"
              color={Colors.danger}
              size={25}
              style={{ transform: [{ rotate: "269deg" }] }}
            />
          ),
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
          title: "Térkép",
          headerShown: false,
          tabBarIcon: () => <FontAwesome5 name="map-marked-alt" color={Colors.secondary} size={25} />,
        }}
      />
      <BottomTab.Screen
        name="TabContacts"
        component={TabContactScreen}
        options={{
          title: "Kontaktok",
          headerShown: false,
          tabBarIcon: () => <FontAwesome5 name="address-book" color={Colors.secondary} size={25} />,
        }}
      />
      <BottomTab.Screen
        name="TabSettings"
        component={TabSettingsScreen}
        options={{
          title: "Beállítások",
          headerShown: false,
          tabBarIcon: () => <FontAwesome5 name="cog" color={Colors.secondary} size={25} />,
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
