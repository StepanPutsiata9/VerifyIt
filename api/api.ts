import { clearTokens, getTokens, storeTokens } from '@/features/auth/storage';
import axios from 'axios';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exponentialBackoff = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (i === maxRetries - 1 || error.response?.status < 500) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
};

export const api = axios.create({
  baseURL: 'https://verifyit-backend-frhc.onrender.com/',
});

let onLogoutCallback: (() => void) | null = null;

export const setOnLogoutCallback = (callback: () => void) => {
  onLogoutCallback = callback;
};

api.interceptors.request.use(async (config) => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const tokens = await getTokens();
    
    if (error.response?.status === 403) {
      if (onLogoutCallback) {
        onLogoutCallback();
      }
      return Promise.reject('403');
    }

    if (error.response?.status === 401 && tokens?.refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await exponentialBackoff(() => 
          axios.post('https://verifyit-backend-frhc.onrender.com/auth/refresh', {
            refreshToken: tokens.refreshToken,
          })
        );
        const { accessToken, refreshToken } = response.data;
        await storeTokens({ accessToken, refreshToken });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return exponentialBackoff(() => axios(originalRequest));
      } catch (refreshError) {
        await clearTokens();
        if (onLogoutCallback) {
          onLogoutCallback();
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 404) {
      if (onLogoutCallback) {
        onLogoutCallback();
      }
      return { data: null };
    }

    if (error.response?.status >= 500 && !originalRequest._retried) {
      originalRequest._retried = true;
      return exponentialBackoff(() => axios(originalRequest));
    }

    return Promise.reject(error);
  }
);
