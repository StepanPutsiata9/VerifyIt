import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHistory } from '../services';
import { HistoryState } from '../types';

const initialState: HistoryState = {
  historyData: null,
  historyLoading: false,
  historyError: null,
};
export const getHistoryArray = createAsyncThunk(
  'history/getHistoryArray',
  async (_, { rejectWithValue }) => {
    try {
      const information = await getHistory();
      return information;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistoryLoading(state, action) {
      state.historyLoading = action.payload;
    },
    clearHistoryData(state) {
      state.historyData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryArray.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(getHistoryArray.fulfilled, (state, action) => {
        state.historyData = action.payload as any;
        state.historyLoading = false;
      })
      .addCase(getHistoryArray.rejected, (state) => {
        state.historyData = null;
        state.historyLoading = false;
      });
  },
});

export const { setHistoryLoading, clearHistoryData } = historySlice.actions;
export default historySlice.reducer;
