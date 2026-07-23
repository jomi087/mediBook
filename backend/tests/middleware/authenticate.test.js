import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

import { authenticate } from "../../middleware/authenticate.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { ERROR_MESSAGES } from "../../constants/messages.constants.js";
import { env } from "../../config/env.js";

describe("authenticate middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };

    res = {};

    next = jest.fn();
  });

  test("should authenticate valid token", () => {
    const token = jwt.sign(
      {
        accountId: "123",
        role: "patient",
      },
      env.JWT_SECRET
    );

    req.headers.authorization = `Bearer ${token}`;

    authenticate(req, res, next);

    expect(req.user).toMatchObject({
      accountId: "123",
      role: "patient",
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test("should reject missing authorization header", () => {
    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      })
    );
  });

  test("should reject invalid authorization format", () => {
    req.headers.authorization = "Basic abc123";

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      })
    );
  });

  test("should reject invalid token", () => {
    req.headers.authorization = "Bearer invalid.token.value";

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_TOKEN,
      })
    );
  });

  test("should reject expired token", () => {
    const expiredToken = jwt.sign(
      {
        accountId: "123",
        role: "patient",
      },
      env.JWT_SECRET,
      {
        expiresIn: -1,
      }
    );

    req.headers.authorization = `Bearer ${expiredToken}`;

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.SESSION_TOKEN_EXPIRED,
      })
    );
  });

  test("should reject token signed with wrong secret", () => {
    const token = jwt.sign(
      {
        accountId: "123",
        role: "patient",
      },
      "wrong-secret"
    );

    req.headers.authorization = `Bearer ${token}`;

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_TOKEN,
      })
    );
  });
});