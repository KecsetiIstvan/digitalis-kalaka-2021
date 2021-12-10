import { CurrentLocation } from './current-location.interface';

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: CurrentLocation;
  contacts: User[];
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  uuid: string;
  name: string;
  emergencyInfo: string;
  settings: string;
}
