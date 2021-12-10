import { CurrentLocation } from './current-location.interface';

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: CurrentLocation;
  contacts: User[];
}
