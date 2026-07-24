import { HTTP_STATUS } from '../constants/http.constants.js';
import { SUCCESS_MESSAGES } from '../constants/messages.constants.js';
import { sendSuccess } from '../utils/apiResponse.js';

export class AuthController {
  /**
   * @param {import("../service/AuthService.js").AuthService} authService
   */

  constructor(authService) {
    this.authService = authService;
  }

  accountInfo = async (req, res) => {
    const accountInfo = await this.authService.accountInfo(req.user.accountId);

    sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.SUCCESS, accountInfo);
  };

  signup = async (req, res) => {
    const { name, email, password } = req.body;

    const { accessToken, accountInfo } = await this.authService.signup(
      name,
      email,
      password
    );

    sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.ACCOUNT_CREATED, {
      accessToken,
      accountInfo,
    });
  };

  signin = async (req, res) => {
    const { email, password } = req.body;

    const { accessToken, accountInfo } = await this.authService.signin(
      email,
      password
    );

    sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.LOGIN_SUCCESS, {
      accessToken,
      accountInfo,
    });
  };
}
