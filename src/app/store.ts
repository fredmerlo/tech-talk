// src/app/store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import mobileNumbersReducer from '../features/mobileNumbersSlice';
import virtualNumbersReducer from '../features/virtualNumbersSlice';
import authReducer from '../features/authSlice';
import userNumbersReducer from '../features/userNumbersSlice';
// Import other reducers...

const rootReducer = combineReducers({
  user: userReducer,
  mobileNumbers: mobileNumbersReducer,
  virtualNumbers: virtualNumbersReducer,
  auth: authReducer,
  userNumbers: userNumbersReducer,
  // Add other reducers here...
});

export const store = configureStore({
  reducer: rootReducer,
});

// Continuing in src/app/store.ts

export type RootState = ReturnType<typeof rootReducer>;
