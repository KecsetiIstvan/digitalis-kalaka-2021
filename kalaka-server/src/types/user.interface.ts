import { CurrentLocation } from './current-location.interface';

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: CurrentLocation;
  contacts: User[];
  emergencyContacts: EmergencyContact[];
  profileImageUrl: string;
}

export interface EmergencyContact {
  _id: string;
  name: string;
  emergencyInfo: string;
  settings: string;
}
