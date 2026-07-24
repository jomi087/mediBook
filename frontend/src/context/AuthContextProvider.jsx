import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService.js';
import { AuthContext } from './AuthContext.jsx';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { getErrorMessage } from '../services/errorHandler.js';
import { toast } from 'sonner';
import { tokenStorage } from '../utils/tokenStorage.js';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Is the initial auth check still running?
  const [loading, setLoading] = useState(true); //used in protected router

  useEffect(() => {
    const token = tokenStorage.get('token');

    if (!token) {
      setLoading(false);
      return;
    }

    async function getCurrentUser() {
      try {
        const res = await AuthService.check();
        setUser(res.data.data);
      } catch (error) {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          setUser(null);
        } else {
          // Network / timeout / server error
          toast.error(getErrorMessage(error));
        }
      } finally {
        setLoading(false);
      }
    }

    getCurrentUser();
  }, []);

  const signup = async (registrationData) => {
    const res = await AuthService.signup(registrationData);

    const { accessToken, accountInfo } = res.data.data;

    tokenStorage.set(accessToken);

    setUser(accountInfo);

    return accountInfo;
  };

  const login = async (credentials) => {
    const res = await AuthService.signin(credentials);

    const { accessToken, accountInfo } = res.data.data;

    tokenStorage.set(accessToken);

    setUser(accountInfo);

    return accountInfo;
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user, // boolean conversion !!user which simply skip of writing code like this  if (user) then true else false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
