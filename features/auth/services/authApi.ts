import { api } from '@/api';

export const loginApi = async (loginText: string, passwordText: string) => {
  const response = await api.post('auth/login', {
    login: loginText,
    password: passwordText,
  });
  return response.data;
};

export const registrationApi = async (loginText: string, passwordText: string) => {
  const response = await api.post('auth/registration', {
    login: loginText,
    password: passwordText,
  });
  return response.data;
};
export const logoutApi = async () => {
  const response = await api.post('auth/logout');
  return response.data;
};
