import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; // 1. Import this built-in utility
import { env } from './env.js';

// 2. Recreate __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Your original path logic will now work perfectly
const logDir = path.join(__dirname, '../logs');

// Ensure directories exist
fs.mkdirSync(path.join(logDir, 'combined'), { recursive: true });
fs.mkdirSync(path.join(logDir, 'error'), { recursive: true });

const isProd = env.NODE_ENV === 'production';

const isTest = env.NODE_ENV === 'test';
//# `NODE_ENV` can become "test" either manually or automatically.
// Jest automatically sets it to "test" when running `npm test`.

export const logger = createLogger({
  level: isProd ? 'info' : 'debug',
  silent: isTest, // `silent: isTest` -> suppresses all log output during tests,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'error', 'error.log'),
      level: 'error',
    }),

    // All logs
    new transports.File({
      filename: path.join(logDir, 'combined', 'combined.log'),
      level: 'info',
    }),
  ],
});

if (!isProd && !isTest) {
  // Add console logging only outside production.
  // Even if we remove `!isTest` from `if (!isProd && !isTest)`, nothing will be logged
  // because `silent: isTest` suppresses all log output during tests.
  // We still keep `!isTest` to make the intent explicit and improve readability.

  logger.add(
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.errors({ stack: true }),
        format.prettyPrint()
      ),
    })
  );
}

/*
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
*/
