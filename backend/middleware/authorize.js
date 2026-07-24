import { HTTP_STATUS } from '../constants/http.constants.js';
import { ERROR_MESSAGES } from '../constants/messages.constants.js';
import { AppError } from '../errors/AppError.js';

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // deffensive check
    if (!req.user) {
      return next(
        new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED)
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN)
      );
    }

    next();
  };
};
