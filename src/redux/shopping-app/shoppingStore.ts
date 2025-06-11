import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productsReducer from './features/productSlice';

export const shoppingStore = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof shoppingStore.getState>;
export type AppDispatch = typeof shoppingStore.dispatch;
