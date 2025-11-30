import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkInApi, checkOutApi, todayStatusApi, myHistoryApi } from './attendanceApi';

const getErr = (e, fallback) => e?.response?.data?.message || e?.message || fallback;

const initialState = {
  loading: false,
  error: null,
  today: null,
  myHistory: [],
};

export const todayStatusThunk = createAsyncThunk('attendance/today', async (_, { rejectWithValue }) => {
  try { return await todayStatusApi(); }
  catch (e) { return rejectWithValue(getErr(e, 'Failed to load today status')); }
});

export const checkInThunk = createAsyncThunk('attendance/checkin', async (_, { rejectWithValue }) => {
  try { return await checkInApi(); }
  catch (e) { return rejectWithValue(getErr(e, 'Check-in failed')); }
});

export const checkOutThunk = createAsyncThunk('attendance/checkout', async (_, { rejectWithValue }) => {
  try { return await checkOutApi(); }
  catch (e) { return rejectWithValue(getErr(e, 'Check-out failed')); }
});

export const myHistoryThunk = createAsyncThunk('attendance/myHistory', async (_, { rejectWithValue }) => {
  try { return await myHistoryApi(); }
  catch (e) { return rejectWithValue(getErr(e, 'Failed to load history')); }
});

const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: { clearError: (s) => { s.error = null; } },
  extraReducers: (b) => {
    const pend = (s) => { s.loading = true; s.error = null; };
    const rej = (s, a) => { s.loading = false; s.error = a.payload || a.error?.message; };

    b.addCase(todayStatusThunk.pending, pend)
     .addCase(todayStatusThunk.fulfilled, (s, a) => { s.loading = false; s.today = a.payload; })
     .addCase(todayStatusThunk.rejected, rej);

    b.addCase(checkInThunk.pending, pend)
     .addCase(checkInThunk.fulfilled, (s, a) => { s.loading = false; s.today = a.payload; })
     .addCase(checkInThunk.rejected, rej);

    b.addCase(checkOutThunk.pending, pend)
     .addCase(checkOutThunk.fulfilled, (s, a) => { s.loading = false; s.today = a.payload; })
     .addCase(checkOutThunk.rejected, rej);

    b.addCase(myHistoryThunk.pending, pend)
     .addCase(myHistoryThunk.fulfilled, (s, a) => { s.loading = false; s.myHistory = a.payload; })
     .addCase(myHistoryThunk.rejected, rej);
  }
});

export const { clearError } = slice.actions;
export default slice.reducer;