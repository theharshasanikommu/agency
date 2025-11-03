import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchClients = createAsyncThunk('clients/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/clients');
    return data.clients;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message);
  }
});

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default clientSlice.reducer;
