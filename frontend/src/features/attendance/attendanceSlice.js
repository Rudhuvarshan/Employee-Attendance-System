import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  todayStatusApi,
  checkInApi,
  checkOutApi,
  myHistoryApi,
  allAttendanceApi,
  calendarAttendanceApi,
  employeeHistoryApi
} from './attendanceApi';

const getErr = (e, fallback) => e?.response?.data?.message || e?.message || fallback;

const initialState = {
  loading: false,
  error: null,
  today: null,
  myHistory: [],
  allRecords: [],
  calendarRecords: {},
  employeeHistory: [],
};

// Thunks
export const todayStatusThunk = createAsyncThunk('attendance/today', async (_, { rejectWithValue }) => {
  try { return await todayStatusApi(); } catch (e) { return rejectWithValue(getErr(e, 'Failed to load today status')); }
});
export const checkInThunk = createAsyncThunk('attendance/checkin', async (_, { rejectWithValue }) => {
  try { return await checkInApi(); } catch (e) { return rejectWithValue(getErr(e, 'Check-in failed')); }
});
export const checkOutThunk = createAsyncThunk('attendance/checkout', async (_, { rejectWithValue }) => {
  try { return await checkOutApi(); } catch (e) { return rejectWithValue(getErr(e, 'Check-out failed')); }
});
export const myHistoryThunk = createAsyncThunk('attendance/myHistory', async (_, { rejectWithValue }) => {
  try { return await myHistoryApi(); } catch (e) { return rejectWithValue(getErr(e, 'Failed to load history')); }
});
export const allAttendanceThunk = createAsyncThunk('attendance/all', async (_, { rejectWithValue }) => {
  try { return await allAttendanceApi(); } catch (e) { return rejectWithValue(getErr(e, 'Failed to load all attendance')); }
});
export const calendarAttendanceThunk = createAsyncThunk('attendance/calendar', async (_, { rejectWithValue }) => {
  try { return await calendarAttendanceApi(); } catch (e) { return rejectWithValue(getErr(e, 'Failed to load calendar')); }
});
export const employeeHistoryThunk = createAsyncThunk('attendance/employeeHistory', async (id, { rejectWithValue }) => {
  try { return await employeeHistoryApi(id); } catch (e) { return rejectWithValue(getErr(e, 'Failed to load employee history')); }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: { clearError: (state) => { state.error = null; } },
  extraReducers: (builder) => {
    const pend = (s) => { s.loading = true; s.error = null; };
    const rej = (s, a) => { s.loading = false; s.error = a.payload || a.error?.message; };

    builder
      .addCase(todayStatusThunk.pending, pend).addCase(todayStatusThunk.fulfilled, (s, a) => { s.loading = false; s.today = a.payload; }).addCase(todayStatusThunk.rejected, rej)
      .addCase(checkInThunk.pending, pend).addCase(checkInThunk.fulfilled, (s, a) => { s.loading = false; s.today = a.payload; }).addCase(checkInThunk.rejected, rej)
      .addCase(checkOutThunk.pending, pend).addCase(checkOutThunk.fulfilled, (s, a) => { s.loading = false; s.today = a.payload; }).addCase(checkOutThunk.rejected, rej)
      .addCase(myHistoryThunk.pending, pend).addCase(myHistoryThunk.fulfilled, (s, a) => { s.loading = false; s.myHistory = a.payload; }).addCase(myHistoryThunk.rejected, rej)
      .addCase(allAttendanceThunk.pending, pend).addCase(allAttendanceThunk.fulfilled, (s, a) => { s.loading = false; s.allRecords = a.payload; }).addCase(allAttendanceThunk.rejected, rej)
      .addCase(calendarAttendanceThunk.pending, pend).addCase(calendarAttendanceThunk.fulfilled, (s, a) => { s.loading = false; s.calendarRecords = a.payload; }).addCase(calendarAttendanceThunk.rejected, rej)
      .addCase(employeeHistoryThunk.pending, pend).addCase(employeeHistoryThunk.fulfilled, (s, a) => { s.loading = false; s.employeeHistory = a.payload; }).addCase(employeeHistoryThunk.rejected, rej);
  },
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;