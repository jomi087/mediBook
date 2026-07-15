import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors.js';
import cookieParser from 'cookie-parser';
import { HTTP_STATUS } from './constants/httpStatus.js';
import { SUCCESS_MESSAGES } from './constants/messages.js';
import { sendSuccess } from './utils/apiResponse.js';

export const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: process.env.BODY_LIMIT }));
app.use(
  express.urlencoded({ extended: true, limit: process.env.URLENCODED_LIMIT })
);
app.use(cookieParser());

app.get('/health', (req, res) => {
  sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.SERVER_RUNNING);
});
