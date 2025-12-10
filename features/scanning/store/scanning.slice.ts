import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDocumentInfo } from '../services';
import { ScanState } from '../types';

const initialState: ScanState = {
  scanningData: null,
  scanningLoading: false,
  scanningError: null,
};
export const getQrInfo = createAsyncThunk(
  'scanning/getQrInfo',
  async (qrData: string, { rejectWithValue }) => {
    try {
      const information = await getDocumentInfo(qrData);
      return information;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
const scanningSlice = createSlice({
  name: 'scanning',
  initialState,
  reducers: {
    setScanningLoading(state, action) {
      state.scanningLoading = action.payload;
    },
    setScanningError(state, action) {
      state.scanningError = action.payload;
    },
    clearScanningData(state) {
      state.scanningData = null;
    },
    setScanningData(state, action) {
      state.scanningData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQrInfo.pending, (state) => {
        state.scanningLoading = true;
      })
      .addCase(getQrInfo.fulfilled, (state, action) => {
        state.scanningData = action.payload;
        state.scanningLoading = false;
      })
      .addCase(getQrInfo.rejected, (state) => {
        state.scanningData = null;
        state.scanningLoading = false;
      });
  },
});

export const { setScanningLoading, setScanningError, clearScanningData, setScanningData } =
  scanningSlice.actions;
export default scanningSlice.reducer;
