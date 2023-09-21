import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './Slice/LoginSlice';

const Store = configureStore({
  reducer: {
    login: LoginSlice.reducer
  },
});
export default Store;
