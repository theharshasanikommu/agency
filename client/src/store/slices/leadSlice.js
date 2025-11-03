import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const submitLead = createAsyncThunk('leads/submit', async (leadData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/leads', leadData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to submit lead');
  }
});

export const fetchLeads = createAsyncThunk('leads/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/leads');
    return data.leads;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch leads');
  }
});

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitLead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitLead.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(submitLead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      });
  }
});

export default leadSlice.reducer;
