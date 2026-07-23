import 'dotenv/config';
import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants/messages.constants.js';

const envSchema = z.object({
  PORT: z.coerce.number(),

  DB_URI: z.string().min(1, ERROR_MESSAGES.MISSING_DB_URI),

  JWT_SECRET: z.string().min(1, ERROR_MESSAGES.MISSING_JWT_SECRET),

  FRONTEND_URL: z.string().url(ERROR_MESSAGES.MISSING_FRONTEND_URL),

  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export const env = envSchema.parse(process.env);
