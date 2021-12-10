import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema(
  {
    latitude: { type: String, required: true, unique: false },
    longitude: { type: String, required: true, unique: false },
  },
  {
    timestamps: true,
  },
);
