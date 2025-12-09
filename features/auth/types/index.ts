export interface JwtPayload {
  login?: string;
  exp?: number;
  foo?: string;
  iat?: number;
  [key: string]: any;
}
export interface AuthState {
  user: JwtPayload | null;
  isLoading: boolean;
  isFirstLaunch: boolean | null;
  authError: string | null;
}
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
