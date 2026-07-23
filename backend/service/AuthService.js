import bcrypt from 'bcrypt';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { ERROR_MESSAGES } from '../constants/messages.constants.js';
import { ROLES } from '../constants/role.constants.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import { ACCESS_TOKEN_EXPIRY, SALT_ROUNDS } from '../constants/auth.constants.js';
import { env } from '../config/env.js';

export class AuthService {
  /**
    * @param {import("../repositories/AuthRepository.js").AuthRepository} authRepository
  */
  constructor(authRepository) {
    this.authRepository = authRepository
  }

  #generateAccessToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  }

  async accountInfo(accountId) {
    const account = await this.authRepository.fetchAccountById(accountId);
    if (!account) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_MESSAGES.ACCOUNT_NOT_FOUND
      );
    }
    return {
      id: account.id,
      email: account.email,
      name: account.name,
      image: account.image,
      role: account.role
    }
  }

  async signup(name, email, password) {
    const existinguser = await this.authRepository.isRegisterByEmail(email);

    if (existinguser) {
      throw new AppError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.ACCOUNT_EXIST);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newAccount = await this.authRepository.registerAccount({
      name,
      email,
      password: hashedPassword,
      role: ROLES.PATIENT,
    });

    const payload = {
      accountId: newAccount.id,
      role: newAccount.role
    }

    const accessToken = this.#generateAccessToken(payload)

    return {
      accessToken,
      accountInfo: {
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
        image: newAccount.image,
        role: newAccount.role
      }
    };
  }

  async signin(email, password) {
    const account = await this.authRepository.fetchAccountByEmail(email);

    if (!account) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(password, account.password);

    if (!passwordMatch) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const payload = {
      accountId: account.id,
      role: account.role
    }

    const accessToken = this.#generateAccessToken(payload)

    return {
      accessToken,
      accountInfo: {
        id: account.id,
        email: account.email,
        name: account.name,
        image: account.image,
        role: account.role
      },
    };
  }
}
