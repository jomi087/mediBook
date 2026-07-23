import { ZodError } from 'zod';
import { errorHandler } from '../../middleware/errorhandler.js';
import { AppError } from '../../errors/AppError.js';
import { HTTP_STATUS } from '../../constants/http.constants.js';
import { ERROR_MESSAGES } from '../../constants/messages.constants.js';
import { jest } from "@jest/globals";

describe('errorHandler middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      method: 'POST',
      originalUrl: '/api/auth/signup',
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  test('should handle ZodError', () => {
    // Arrange
    const error = new ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['email'],
        message: 'Email is required',
      },
    ]);

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: ERROR_MESSAGES.VALIDATION_FAILED,
      errors: [
        {
          field: 'email',
          message: 'Email is required',
        },
      ],
    });
  });

  test('should handle AppError', () => {
    // Arrange
    const error = new AppError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_MESSAGES.ACCOUNT_NOT_FOUND
    );

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      errors: null,
    });
  });

  test('should handle unexpected errors', () => {
    // Arrange
    const error = new Error('Unexpected failure');

    // Act
    errorHandler(error, req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      errors: null,
    });
  });
});