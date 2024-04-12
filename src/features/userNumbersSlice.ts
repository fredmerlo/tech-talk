// src/features/userNumbersSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userNumbersAPI from '../api';

export const fetchUserNumbersAsync = createAsyncThunk(
  'userNumbers/fetchUserNumbers',
  async ({ username }: { username: string }) => {
    const response = await userNumbersAPI.fetchUserNumbers(username);
    return response;
  }
);

export const deleteUserNumberAsync = createAsyncThunk(
  'userNumbers/deleteUserNumber',
  async ({ username, number }: { username: string, number: string }) => {
    await userNumbersAPI.deleteUserNumberAPI(username, number);
    return number;
  }
);

export const addUserNumberAsync = createAsyncThunk(
  'userNumbers/addUserNumber',
  async ({ username, number }: { username: string, number: string }): Promise<{ number: string }> => {
    const response = await userNumbersAPI.addUserNumberAPI(username, number);
    return response;
  }
);

interface UserNumberState {
  numbers: { username: string; number: string }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  addStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserNumberState = {
  numbers: [],
  status: 'idle',
  addStatus: 'idle',
  error: null,
};

const userNumbersSlice = createSlice({
  name: 'userNumbers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNumbersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserNumbersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.numbers = action.payload;
      })
      .addCase(fetchUserNumbersAsync.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUserNumberAsync.fulfilled, (state, action) => {
        state.numbers = state.numbers.filter((number) => number.number !== action.payload);
      })
      .addCase(addUserNumberAsync.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addUserNumberAsync.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.numbers = state.numbers.filter((number) => number.number !== action.payload.number);
      })
      .addCase(addUserNumberAsync.rejected, (state: any, action) => {
        state.addStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userNumbersSlice.reducer;
