/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  TabMap: undefined;
  TabFollow: undefined;
  TabContacts: undefined;
  TabSettings: undefined;
  Login: undefined;
  Chat: undefined;
  Danger: { isLocationEnabled: boolean };
  AddContact: undefined;
  ChangeContactModal: undefined;
  PersonalDataModal: undefined;
  SafetyFeaturesModal: undefined;
  NotificationsModal: undefined;
  TermsModal: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabMap: undefined;
  TabFollow: undefined;
  TabContacts: undefined;
  TabSettings: undefined;
  Danger: { isLocationEnabled: boolean };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
