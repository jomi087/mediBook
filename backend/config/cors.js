import { ERROR_MESSAGES } from '../constants/messages.js';

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(ERROR_MESSAGES.CORS_NOT_ALLOWED));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};
