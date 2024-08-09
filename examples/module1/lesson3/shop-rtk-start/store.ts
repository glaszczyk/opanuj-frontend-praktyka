import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './services/products';

import cartReducer from './state/cartSlice';
import { configureStore } from '@reduxjs/toolkit/react';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  }
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
