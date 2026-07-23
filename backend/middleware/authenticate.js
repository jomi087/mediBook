import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { ERROR_MESSAGES } from '../constants/messages.constants.js';
import { AppError } from '../errors/AppError.js';
import { env } from '../config/env.js';


export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
    }

    const accessToken = authHeader.split(' ')[1];

    const payload = jwt.verify(accessToken, env.JWT_SECRET)
    //console.log(payload) // payload {accountId: string, role: ROLES.PATIENT |ROLES.DOCTOR | ROLES.ADMIN }

    req.user = payload

    next();

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TokenExpiredError') {
        return next(new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.SESSION_TOKEN_EXPIRED));
      }

      if (error.name === 'JsonWebTokenError') {
        return next(new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_TOKEN));
      }
    }

    next(error);
  }
};
