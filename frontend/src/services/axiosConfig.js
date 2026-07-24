import axios from 'axios';
import { HTTP_STATUS } from '../constants/httpStatus.js'
import { tokenStorage } from '../utils/tokenStorage.js';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 10000, // 10 seconds
  //withCredentials: true, // Needed if using refresh-token cookies
});

/* ================================
   REQUEST INTERCEPTOR
================================ */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   RESPONSE INTERCEPTOR
================================ */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // execute when token got error
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      tokenStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

/*
 async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 &&!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');
        store in cookie
        // localStorage.setItem(
        //   'accessToken',
        //   data.accessToken
        // );
        // defnsive mechanism even this thing is alredy doing in the interceptor.req
        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;
        return api(originalRequest);
      }
      catch (refreshError) {
        //store in cookie
        // localStorage.removeItem('accessToken');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
  */