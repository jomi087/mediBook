import { AuthRepository } from "../../repositories/AuthRepository.js";
import accountModel from "../../model/accountModel.js";
import { ROLES } from "../../constants/role.constants.js";

describe("AuthRepository", () => {
  let authRepository;

  beforeEach(() => {
    authRepository = new AuthRepository();
  });

  describe("registerAccount()", () => {
    it("should create a new account", async () => {
      await authRepository.registerAccount({
        name: "John Doe",
        email: "john@example.com",
        password: "hashed-password",
        role: ROLES.PATIENT,
      });

      const account = await accountModel.findOne({
        email: "john@example.com",
      });

      expect(account).not.toBeNull();
      expect(account.name).toBe("John Doe");
      expect(account.email).toBe("john@example.com");
      expect(account.role).toBe(ROLES.PATIENT);
    });
  });

  describe("isRegisterByEmail()", () => {
    it("should return true when account exists", async () => {
      await accountModel.create({
        name: "John Doe",
        email: "john@example.com",
        password: "hashed-password",
        role: ROLES.PATIENT,
      });

      const exists = await authRepository.isRegisterByEmail(
        "john@example.com"
      );

      expect(exists).toBe(true);
    });

    it("should return false when account does not exist", async () => {
      const exists = await authRepository.isRegisterByEmail(
        "unknown@example.com"
      );

      expect(exists).toBe(false);
    });
  });

  describe("fetchAccountByEmail()", () => {
    beforeEach(async () => {
      await accountModel.create({
        name: "John Doe",
        email: "john@example.com",
        password: "hashed-password",
        role: ROLES.PATIENT,
      });
    });

    it("should return mapped account", async () => {
      const account = await authRepository.fetchAccountByEmail(
        "john@example.com"
      );

      expect(account).not.toBeNull();

      expect(account).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: "John Doe",
          email: "john@example.com",
          password: "hashed-password",
          role: ROLES.PATIENT,
        })
      );
    });

    it("should return null for unknown email", async () => {
      const account = await authRepository.fetchAccountByEmail(
        "unknown@example.com"
      );

      expect(account).toBeNull();
    });

    it("should include password", async () => {
      const account = await authRepository.fetchAccountByEmail(
        "john@example.com"
      );

      expect(account.password).toBe("hashed-password");
    });

    it("should map MongoDB _id to id", async () => {
      const account = await authRepository.fetchAccountByEmail(
        "john@example.com"
      );

      expect(account.id).toBeDefined();
      expect(account._id).toBeUndefined();
    });

    it("should not expose mongoose document", async () => {
      const account = await authRepository.fetchAccountByEmail(
        "john@example.com"
      );

      expect(account.save).toBeUndefined();
      expect(account.populate).toBeUndefined();
    });
  });

  describe("fetchAccountById()", () => {
    let createdAccount;

    beforeEach(async () => {
      createdAccount = await accountModel.create({
        name: "John Doe",
        email: "john@example.com",
        password: "hashed-password",
        role: ROLES.PATIENT,
      });
    });

    it("should return mapped account", async () => {
      const account = await authRepository.fetchAccountById(
        createdAccount._id
      );

      expect(account).not.toBeNull();

      expect(account).toEqual(
        expect.objectContaining({
          id: createdAccount._id.toString(),
          name: "John Doe",
          email: "john@example.com",
          role: ROLES.PATIENT,
        })
      );
    });

    it("should return null for unknown id", async () => {
      const fakeId = new accountModel()._id;

      const account = await authRepository.fetchAccountById(fakeId);

      expect(account).toBeNull();
    });

    it("should map MongoDB _id to id", async () => {
      const account = await authRepository.fetchAccountById(
        createdAccount._id
      );

      expect(account.id).toBeDefined();
      expect(account._id).toBeUndefined();
    });

    it("should not expose mongoose document", async () => {
      const account = await authRepository.fetchAccountById(
        createdAccount._id
      );

      expect(account.save).toBeUndefined();
      expect(account.populate).toBeUndefined();
    });
  });
});