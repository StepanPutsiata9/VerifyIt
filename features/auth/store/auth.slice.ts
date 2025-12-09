import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { clearTokens, getTokens, storeTokens } from '../storage';
import { AuthState, JwtPayload, Tokens } from '../types';

const isTokenValid = (decoded: unknown): boolean => {
  if (typeof decoded !== 'object' || decoded === null) {
    return false;
  }
  const payload = decoded as JwtPayload;
  if (payload.exp === undefined) {
    return true;
  }
  if (typeof payload.exp !== 'number') {
    return false;
  }
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  return expirationTime > currentTime;
};
const checkTokenExpiration = (token: string) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token) as JwtPayload;
    return isTokenValid(decoded);
  } catch (error) {
    console.error('Token decode error:', error);
    return false;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isFirstLaunch: null,
  authError: null,
};

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const tokens = await getTokens();
    if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
      const decoded = jwtDecode(tokens.accessToken);
      return { decoded };
    } else {
      const decoded = null;
      return { decoded };
    }
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ accessToken, refreshToken }: Tokens, { rejectWithValue }) => {
    try {
      if (!accessToken || !refreshToken) {
        throw new Error('Access token and refresh token are required');
      }
      try {
        await storeTokens({ accessToken, refreshToken });
      } catch (storageError) {
        console.error('Failed to store tokens:', storageError);
        throw new Error('Failed to save authentication data');
      }
      try {
        const tokens = await getTokens();
        if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
          const decoded = jwtDecode(tokens.accessToken);
          return decoded;
        } else {
          const decoded = null;
          return decoded;
        }
      } catch (error) {
        console.error('Login error:', error);
        const decoded = null;
        return decoded;
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await clearTokens();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsFirstLaunch(state, action) {
      state.isFirstLaunch = action.payload;
    },
    setAuthError(state, action) {
      state.authError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.decoded;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { setLoading, setIsFirstLaunch, setAuthError } = authSlice.actions;
export default authSlice.reducer;
