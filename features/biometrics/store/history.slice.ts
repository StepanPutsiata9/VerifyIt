import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDocument, getHistory } from '../services';
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

export const deleteDocumentItem = createAsyncThunk(
  'history/deleteDocumentItem',
  async (id: string, { rejectWithValue }) => {
    try {
      const isDelete = await deleteDocument(id);
      if (isDelete) {
        return id;
      }
      if (!isDelete) {
        throw new Error('Failed to delete ticket');
      }
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
    removeDocLocally: (state, action) => {
      if (state.historyData) {
        state.historyData = state.historyData.filter((doc) => doc.id !== action.payload);
      }
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
      })

      .addCase(deleteDocumentItem.pending, (state) => {
        state.historyError = null;
      })
      .addCase(deleteDocumentItem.fulfilled, (state, action) => {
        if (state.historyData) {
          state.historyData = state.historyData.filter((doc) => doc.id !== action.payload);
        }
      })
      .addCase(deleteDocumentItem.rejected, (state, action) => {
        state.historyError = action.payload as string;
      });
  },
});

export const { setHistoryLoading, clearHistoryData, removeDocLocally } = historySlice.actions;
export default historySlice.reducer;
