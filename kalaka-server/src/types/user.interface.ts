import { CurrentLocation } from './current-location.interface';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: CurrentLocation;
  contacts: User[];
}
