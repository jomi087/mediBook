import { jest } from "@jest/globals";

import { AuthController } from "../../controllers/AuthController.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { SUCCESS_MESSAGES } from "../../constants/messages.constants.js";
import { ROLES } from "../../constants/role.constants.js";

describe("AuthController", () => {
  let authService;
  let authController;
  let req;
  let res;

  beforeEach(() => {
    authService = {
      signup: jest.fn(),
      signin: jest.fn(),
      accountInfo: jest.fn(),
    };

    authController = new AuthController(authService);

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("signup()", () => {
    it("should create a new account", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "Password@123",
      };

      authService.signup.mockResolvedValue({
        accessToken: "jwt-token",
        accountInfo: {
          id: "123",
          name: "John Doe",
          email: "john@example.com",
          image: "image-url",
          role: ROLES.PATIENT,
        },
      });

      await authController.signup(req, res);

      expect(authService.signup).toHaveBeenCalledWith(
        "John Doe",
        "john@example.com",
        "Password@123"
      );

      expect(res.status).toHaveBeenCalledWith(
        HTTP_STATUS.CREATED
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: SUCCESS_MESSAGES.ACCOUNT_CREATED,
        data: {
          accessToken: "jwt-token",
          accountInfo: {
            id: "123",
            name: "John Doe",
            email: "john@example.com",
            image: "image-url",
            role: ROLES.PATIENT,
          },
        }
      });
    });

    it("should propagate signup errors", async () => {
      const error = new Error("Signup failed");

      authService.signup.mockRejectedValue(error);

      req.body = {
        name: "John",
        email: "john@test.com",
        password: "Password@123",
      };

      await expect(
        authController.signup(req, res)
      ).rejects.toThrow(error);
    });
  });

  describe("signin()", () => {
    it("should login successfully", async () => {
      req.body = {
        email: "john@test.com",
        password: "Password@123",
      };

      authService.signin.mockResolvedValue({
        accessToken: "jwt-token",
        accountInfo: {
          id: "123",
          name: "John Doe",
          email: "john@test.com",
          image: "image-url",
          role: ROLES.PATIENT,
        },
      });

      await authController.signin(req, res);

      expect(authService.signin).toHaveBeenCalledWith(
        "john@test.com",
        "Password@123"
      );

      expect(res.status).toHaveBeenCalledWith(
        HTTP_STATUS.OK
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        data: {
          accessToken: "jwt-token",
          accountInfo: {
            id: "123",
            name: "John Doe",
            email: "john@test.com",
            image: "image-url",
            role: ROLES.PATIENT,
          }
        }
      });
    });

    it("should propagate signin errors", async () => {
      const error = new Error("Signin failed");

      authService.signin.mockRejectedValue(error);

      req.body = {
        email: "john@test.com",
        password: "Password@123",
      };

      await expect(
        authController.signin(req, res)
      ).rejects.toThrow(error);
    });
  });

  describe("accountInfo()", () => {
    it("should return account information", async () => {
      req.user = {
        accountId: "123",
      };

      authService.accountInfo.mockResolvedValue({
        id: "123",
        name: "John Doe",
        email: "john@example.com",
        image: "image-url",
        role: ROLES.PATIENT,
      });

      await authController.accountInfo(req, res);

      expect(authService.accountInfo)
        .toHaveBeenCalledWith("123");

      expect(res.status).toHaveBeenCalledWith(
        HTTP_STATUS.OK
      );

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: SUCCESS_MESSAGES.SUCCESS,
        data: {
          id: "123",
          name: "John Doe",
          email: "john@example.com",
          image: "image-url",
          role: ROLES.PATIENT,
        },
      });
    });

    it("should propagate accountInfo errors", async () => {
      const error = new Error("Account not found");

      authService.accountInfo.mockRejectedValue(error);

      req.user = {
        accountId: "123",
      };

      await expect(
        authController.accountInfo(req, res)
      ).rejects.toThrow(error);
    });
  });
});