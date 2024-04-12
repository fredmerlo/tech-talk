import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsage } from '../api';

export const fetchUsageAsync = createAsyncThunk(
  'user/fetchUser',
  async ({ username }: { username: string }) => {
    const response = await fetchUsage(username);
    return response;
  }
);

interface UserData {
  totalUsage: string;
  totalCost: string;
  usageDate: string;
  number: string;
}

interface UserState {
  data: UserData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  data: { totalUsage: '', totalCost: '', usageDate: '', number: ''},
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsageAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsageAsync.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
