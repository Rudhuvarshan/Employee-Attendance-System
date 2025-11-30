import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi, meApi } from './authApi';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try { return await loginApi(payload); }
  catch (e) { return rejectWithValue(e?.response?.data?.message || 'Login failed'); }
});

export const registerThunk = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try { return await registerApi(payload); }
  catch (e) { return rejectWithValue(e?.response?.data?.message || 'Register failed'); }
});

export const meThunk = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try { return await meApi(); }
  catch (e) { return rejectWithValue(e?.response?.data?.message || 'Load user failed'); }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (s) => { s.user = null; s.token = null; localStorage.removeItem('user'); localStorage.removeItem('token'); },
    clearAuthError: (s) => { s.error = null; }
  },
  extraReducers: (b) => {
    const pend = (s) => { s.loading = true; s.error = null; };
    const rej = (s, a) => { s.loading = false; s.error = a.payload || a.error?.message; };

    b.addCase(loginThunk.pending, pend)
     .addCase(loginThunk.fulfilled, (s, a) => {
       s.loading = false; s.error = null;
       s.user = a.payload.user; s.token = a.payload.token;
       localStorage.setItem('user', JSON.stringify(a.payload.user));
       localStorage.setItem('token', a.payload.token);
     })
     .addCase(loginThunk.rejected, rej);

    b.addCase(registerThunk.pending, pend)
     .addCase(registerThunk.fulfilled, (s, a) => {
       s.loading = false; s.error = null;
       s.user = a.payload.user; s.token = a.payload.token;
       localStorage.setItem('user', JSON.stringify(a.payload.user));
       localStorage.setItem('token', a.payload.token);
     })
     .addCase(registerThunk.rejected, rej);

    b.addCase(meThunk.pending, pend)
     .addCase(meThunk.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
     .addCase(meThunk.rejected, rej);
  }
});

export const { logout, clearAuthError } = slice.actions;
export default slice.reducer;