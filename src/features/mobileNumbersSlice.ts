// src/features/mobileNumbersSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMobileNumbers } from '../api'; // Adjust the import path as necessary

// Define a type for the slice state
interface MobileNumberState {
  numbers: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: MobileNumberState = {
  numbers: [],
  status: 'idle',
  error: null,
};

// Async thunk action
export const fetchMobileNumbersAsync = createAsyncThunk(
  'mobileNumbers/fetchMobileNumbers',
  async ({ username }: {username: string}) => {
    const response = await fetchMobileNumbers(username);
    return response;
  }
);

export const mobileNumbersSlice = createSlice({
  name: 'mobileNumbers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMobileNumbersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMobileNumbersAsync.fulfilled, (state: any, action) => {
        state.status = 'succeeded';
        state.numbers = action.payload;
      })
      .addCase(fetchMobileNumbersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch mobile numbers';
      });
  },
});

export default mobileNumbersSlice.reducer;
