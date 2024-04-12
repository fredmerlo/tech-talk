// src/features/virtualNumbersSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as virtualNumbersAPI from '../api';

export const fetchVirtualNumbersAsync = createAsyncThunk(
  'virtualNumbers/fetchVirtualNumbers',
  async ({ username }: { username: string }) => {
    const response = await virtualNumbersAPI.fetchVirtualNumbers(username);
    return response;
  }
);

export const deleteVirtualNumberAsync = createAsyncThunk(
  'virtualNumbers/deleteVirtualNumber',
  async ({ username, number }: { username: string, number: string }) => {
    await virtualNumbersAPI.deleteVirtualNumberAPI(username, number);
    return number;
  }
);

export const addVirtualNumberAsync = createAsyncThunk(
  'virtualNumbers/addVirtualNumber',
  async ({ username, number }: { username: string, number: string }): Promise<{ number: string }> => {
    const response = await virtualNumbersAPI.addVirtualNumberAPI(username, number);
    return response;
  }
);

interface VirtualNumberState {
  numbers: { username: string; number: string }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  addStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VirtualNumberState = {
  numbers: [],
  status: 'idle',
  addStatus: 'idle',
  error: null,
};

const virtualNumbersSlice = createSlice({
  name: 'virtualNumbers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVirtualNumbersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVirtualNumbersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.numbers = action.payload;
      })
      .addCase(fetchVirtualNumbersAsync.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteVirtualNumberAsync.fulfilled, (state, action) => {
        state.numbers = state.numbers.filter((number) => number.number !== action.payload);
      })
      .addCase(addVirtualNumberAsync.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addVirtualNumberAsync.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.numbers = state.numbers.filter((number) => number.number !== action.payload.number);
      })
      .addCase(addVirtualNumberAsync.rejected, (state: any, action) => {
        state.addStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default virtualNumbersSlice.reducer;
