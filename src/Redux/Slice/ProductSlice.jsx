import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import React from 'react';

const initialState = {
  loading: false,
  prod: [],
  error: '',
};
export const ProductFetch = createAsyncThunk('product', async () => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res?.data;
});

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(ProductFetch.pending, state => {
      state.loading = true;
    });
    builder.addCase(ProductFetch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.prod = payload;
    });
    builder.addCase(ProductFetch.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default ProductSlice.reducer;
