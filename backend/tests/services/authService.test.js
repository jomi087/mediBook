import { jest } from "@jest/globals";

// Mock first
const hash = jest.fn();
const compare = jest.fn();
const sign = jest.fn();

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash,
    compare,
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign,
  },
}));

// Then import modules that depend on them
const { AuthService } = await import("../../service/AuthService.js");
const { ROLES } = await import("../../constants/role.constants.js");
const { ERROR_MESSAGES } = await import("../../constants/messages.constants.js");
const { HTTP_STATUS } = await import("../../constants/http.constants.js");

describe("AuthService", () => {
  let authRepository;
  let authService;

  beforeEach(() => {
    authRepository = {
      isRegisterByEmail: jest.fn(),
      registerAccount: jest.fn(),
      fetchAccountByEmail: jest.fn(),
      fetchAccountById: jest.fn(),
    };

    authService = new AuthService(authRepository);

    jest.clearAllMocks();
  });

  describe("signup()", () => {
    const name = "John Doe";
    const email = "john@example.com";
    const password = "Password@123";

    it("should register a new account", async () => {
      authRepository.isRegisterByEmail.mockResolvedValue(false);

      hash.mockResolvedValue("hashed-password");

      authRepository.registerAccount.mockResolvedValue({
        id: "123",
        name,
        email,
        image: "image-url",
        role: ROLES.PATIENT,
      });

      sign.mockReturnValue("jwt-token");

      const result = await authService.signup(name, email, password);

      expect(authRepository.isRegisterByEmail).toHaveBeenCalledWith(email);

      expect(hash).toHaveBeenCalledWith(password, expect.any(Number));

      expect(authRepository.registerAccount).toHaveBeenCalledWith({
        name,
        email,
        password: "hashed-password",
        role: ROLES.PATIENT,
      });

      expect(sign).toHaveBeenCalled();

      expect(result).toEqual({
        accessToken: "jwt-token",
        accountInfo: {
          id: "123",
          name,
          email,
          image: "image-url",
          role: ROLES.PATIENT,
        },
      });
    });

    it("should throw if email already exists", async () => {
      authRepository.isRegisterByEmail.mockResolvedValue(true);

      await expect(
        authService.signup(name, email, password)
      ).rejects.toMatchObject({
        statusCode: HTTP_STATUS.CONFLICT,
        message: ERROR_MESSAGES.ACCOUNT_EXIST,
      });

      expect(authRepository.registerAccount).not.toHaveBeenCalled();
    });
  });

  describe("signin()", () => {
    const email = "john@example.com";
    const password = "Password@123";

    const account = {
      id: "123",
      name: "John Doe",
      email,
      password: "hashed-password",
      image: "image-url",
      role: ROLES.PATIENT,
    };

    it("should login successfully", async () => {
      authRepository.fetchAccountByEmail.mockResolvedValue(account);

      compare.mockResolvedValue(true);

      sign.mockReturnValue("jwt-token");

      const result = await authService.signin(email, password);

      expect(compare).toHaveBeenCalledWith(password, account.password);

      expect(sign).toHaveBeenCalled();

      expect(result).toEqual({
        accessToken: "jwt-token",
        accountInfo: {
          id: "123",
          name: "John Doe",
          email,
          image: "image-url",
          role: ROLES.PATIENT,
        },
      });
    });

    it("should throw if account does not exist", async () => {
      authRepository.fetchAccountByEmail.mockResolvedValue(null);

      await expect(
        authService.signin(email, password)
      ).rejects.toMatchObject({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    });

    it("should throw if password is incorrect", async () => {
      authRepository.fetchAccountByEmail.mockResolvedValue(account);

      compare.mockResolvedValue(false);

      await expect(
        authService.signin(email, password)
      ).rejects.toMatchObject({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });

      expect(sign).not.toHaveBeenCalled();
    });
  });

  describe("accountInfo()", () => {
    const account = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      image: "image-url",
      role: ROLES.PATIENT,
    };

    it("should return account information", async () => {
      authRepository.fetchAccountById.mockResolvedValue(account);

      const result = await authService.accountInfo("123");

      expect(authRepository.fetchAccountById)
        .toHaveBeenCalledWith("123");

      expect(result).toEqual(account);
    });

    it("should throw if account does not exist", async () => {
      authRepository.fetchAccountById.mockResolvedValue(null);

      await expect(
        authService.accountInfo("123")
      ).rejects.toMatchObject({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      });
    });
  });
});