import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  const mongoUrl =env.DB_URI;
  await mongoose.connect(mongoUrl);
};
