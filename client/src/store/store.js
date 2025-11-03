import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leadReducer from './slices/leadSlice';
import clientReducer from './slices/clientSlice';
import projectReducer from './slices/projectSlice';
import reportReducer from './slices/reportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadReducer,
    clients: clientReducer,
    projects: projectReducer,
    reports: reportReducer
  }
});
