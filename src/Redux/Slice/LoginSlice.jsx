import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  token: '',
  loading: false,
  LogoutToggle: false,
  redirectTo: null,
  error: '',
};

const loginUser = createAsyncThunk('login', async user => {
  try {
  } catch (error) {
    console.log(error);
  }
});

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    check_token: state => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token !== null && token !== undefined && token !== '') {
        state.LogoutToggle = true;
      }
    },
    loginStatus: (state, { payload }) => {
      state.LogoutToggle = true;
    },
    logout: (state, { payload }) => {
      localStorage.removeItem('name');
      localStorage.removeItem('token');
      state.LogoutToggle = false;
    },
    redirectToo: (state, { payload }) => {
      state.redirectTo = payload;
    },
  },
  extraReducers: builder => {},
});
export const { redirectToo, check_token, loginStatus, logout } = LoginSlice.actions;
export default LoginSlice;
