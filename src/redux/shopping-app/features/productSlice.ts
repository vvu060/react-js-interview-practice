import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './cartSlice';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
  searchTerm: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredProducts = state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(action.payload.toLowerCase())
      );
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.products = action.payload;
          state.filteredProducts = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setSearchTerm, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;
