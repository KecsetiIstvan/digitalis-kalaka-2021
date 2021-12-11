import * as mongoose from 'mongoose';
import * as argon2 from 'argon2';
import { CurrentLocation } from '@types';
import { LocationSchema } from './location.schema';
import { EmergencyContactSchema } from './emergencyContact.schema';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
  location: { type: LocationSchema, required: false, unique: false },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  emergencyContacts: [
    {
      type: EmergencyContactSchema,
      required: false,
      unique: false,
    },
  ],
  profileImageUrl: { types: String, required: false, unique: false },
});

UserSchema.pre('save', async function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  user.password = await argon2.hash(this.password);
});
