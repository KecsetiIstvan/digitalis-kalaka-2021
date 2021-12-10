import * as mongoose from 'mongoose';
import * as argon2 from 'argon2';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  firstName: { type: String, required: true, unique: false },
  lastName: { type: String, required: true, unique: false },
});

UserSchema.pre('save', async function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  user.password = await argon2.hash(this.password);
});
