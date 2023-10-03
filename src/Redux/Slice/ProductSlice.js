import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  loading: false,
  prod: [],
  error: '',
};
export const ProductFetch = createAsyncThunk('product', async () => {
  try {
    const res = await axios.get('https://fakestoreapi.com/products');
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleDescription: (state, action) => {
      const item = state.prod.find(item => item.id === action.payload);
      if (item) {
        item.showDescription = !item.showDescription;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(ProductFetch.pending, state => {
      state.loading = true;
    });
    builder.addCase(ProductFetch.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.prod = payload;
      state.prod = payload.map(item => ({
        ...item,
        showDescription: false,
      }));
    });
    builder.addCase(ProductFetch.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export const { toggleDescription } = ProductSlice.actions;

export default ProductSlice.reducer;
