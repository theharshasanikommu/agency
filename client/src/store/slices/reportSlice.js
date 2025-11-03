import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchReports = createAsyncThunk('reports/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/reports');
    return data.reports;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default reportSlice.reducer;
