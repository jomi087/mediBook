import mongoose from 'mongoose';
import { ERROR_MESSAGES } from '../constants/messages.js';

export const connectDB = async () => {
  const mongoUrl = process.env.DB_URI;

  if (!mongoUrl) {
    throw new Error(ERROR_MESSAGES.MISSING_DB_URI);
  }

  await mongoose.connect(mongoUrl);
};
