import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity?: number;
}

interface CartState {
  items: Product[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalItems = state.items.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;

        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }

      state.totalItems = state.items.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
