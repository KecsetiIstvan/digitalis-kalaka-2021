import * as mongoose from 'mongoose';

export const EmergencyContactSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true, generated: true },
  name: { type: String, required: true, unique: false },
  emergencyInfo: { type: String, required: true, unique: false },
  settings: { type: String, required: true, unique: false },
});
