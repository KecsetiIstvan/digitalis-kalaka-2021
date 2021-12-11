import * as mongoose from 'mongoose';

export const EmergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  emergencyInfo: { type: String, required: true, unique: false },
  settings: { type: String, required: true, unique: false },
});
