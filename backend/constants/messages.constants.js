export const SUCCESS_MESSAGES = {
  SERVER_RUNNING: 'Server is running',
  ACCOUNT_CREATED: 'A/C Created Successfuly',
  LOGIN_SUCCESS: 'Welcome 🙏',
  SUCCESS: 'Success',
  //Auth
  //Profile
  //Doctors
  //Appointments
  //Paymeny
};

export const ERROR_MESSAGES = {
  //env
  MISSING_DB_URI: 'DB_URI is missing',
  MISSING_JWT_SECRET: 'JWT_SECRET is missing',
  MISSING_FRONTEND_URL: 'FRONTEND_URL must be a valid URL',

  //Auth
  ACCOUNT_EXIST: 'A/C alredy Exist',
  ACCOUNT_NOT_FOUND: 'A/C not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Un-Autrherised',
  SESSION_TOKEN_EXPIRED: 'Session expired. Please login again.',
  INVALID_TOKEN: 'Invalid authentication token',
  FORBIDDEN: 'You do not have permission to perform this action.',

  //Profile
  //Doctors
  //Appointments
  //Payment

  //common
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  VALIDATION_FAILED: 'Validation failed',
  CORS_NOT_ALLOWED: 'Not allowed by CORS',
};
