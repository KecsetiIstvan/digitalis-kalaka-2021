/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabMap: {
            screens: {
              TabMapScreen: 'map',
            },
          },
          TabFollow: {
            screens: {
              TabFollowScreen: 'follow',
            },
          },
          TabContacts: {
            screens: {
              TabContactScreen: 'contacts'
            }
          },
          TabSettings: {
            screens: {
              TabSettingsScreen: 'settings'
            }
          },
        },
      },
      Modal: 'modal',
      Danger: 'danger',
      AddContact: 'addContact',
      Chat: 'chat',
      ChangeContactModal: 'changeContactModal',
      PersonalDataModal: 'personalDataModal',
      SafetyFeaturesModal: 'safetyFeaturesModal',
      NotificationsModal: 'notificationsModal',
      TermsModal: 'termsModal',
      FeedbackModal: 'feedbackModal',
      NotFound: '*',
    },
  },
};

export default linking;
