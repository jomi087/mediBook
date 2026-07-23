import { jest } from "@jest/globals";

import { authorize } from "../../middleware/authorize.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { ERROR_MESSAGES } from "../../constants/messages.constants.js";
import { ROLES } from "../../constants/role.constants.js";

describe("authorize middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
  });

  test("should allow authorized role", () => {
    req.user = {
      accountId: "123",
      role: ROLES.ADMIN,
    };

    authorize(ROLES.ADMIN)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test("should reject request when user is missing", () => {
    authorize(ROLES.ADMIN)(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      })
    );
  });

  test("should reject forbidden role", () => {
    req.user = {
      accountId: "123",
      role: ROLES.PATIENT,
    };

    authorize(ROLES.ADMIN)(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: ERROR_MESSAGES.FORBIDDEN,
      })
    );
  });

  test("should allow any role included in allowed roles", () => {
    req.user = {
      accountId: "123",
      role: ROLES.DOCTOR,
    };

    authorize(
      ROLES.ADMIN,
      ROLES.DOCTOR
    )(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});