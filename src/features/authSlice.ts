// src/features/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authenticateUserAPI } from '../api';

interface User {
  username: string;
  isLoggedIn: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Async thunk for user authentication
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ username, password }: { username: string; password: string; }, { rejectWithValue } : any) => {
    try {
      // Simulate API call
      const response = await authenticateUserAPI(username, password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to clear the authentication state
    clearAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;
