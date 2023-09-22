import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from './Slice/LoginSlice';
import ProductSlice from './Slice/ProductSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  LoginSlice,
  ProductSlice,
});

const Store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV != 'production',

  // reducer: {
  //   login: LoginSlice.reducer,
  //   product: ProductSlice.reducer,
  // },
});
export default Store;
