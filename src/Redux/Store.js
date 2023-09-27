import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from './Slice/LoginSlice';
import ProductSlice from './Slice/ProductSlice';
import thunk from 'redux-thunk';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
  LoginSlice,
  ProductSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV != 'production',

  // reducer: {
  //   login: LoginSlice.reducer,
  //   product: ProductSlice.reducer,
  // },
});
export const persistor=persistStore(Store)
export default Store;
