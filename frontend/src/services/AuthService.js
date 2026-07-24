import { API_ROUTES } from '../constants/apiConstants';
import axiosInstance from './axiosConfig.js';

const { AUTH } = API_ROUTES;

class AuthService {
  async check() {
    return axiosInstance.get(AUTH.CHECK)
  }

  /**
   * Logs in a user.
   * @param {{ name:string, email: string, password: string }} registrationData
   * @returns {Promise<import("axios").AxiosResponse<{
   *   accessToken: string;
   *   accountInfo: {
   *     id: string;
   *     name: string;
   *     email: string;
   *     role: string;
   *   };
   * }>>}
  */

  async signup(registrationData) {
    return axiosInstance.post(AUTH.SIGNUP, registrationData);
  }

  /**
   * Sign up a user.
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<import("axios").AxiosResponse<{
   *   accessToken: string;
   *   accountInfo: {
   *     id: string;
   *     name: string;
   *     email: string;
   *     role: string;
   *   };
   * }>>}
  */

  async signin(credentials) {
    return axiosInstance.post(AUTH.SIGNIN, credentials);
  }

}

export default new AuthService();
