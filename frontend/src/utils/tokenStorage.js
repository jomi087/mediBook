import { STORAGE_KEYS } from '../constants/storageConstants.js';

export const tokenStorage = {
  get() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  set(token) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  clear() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};
