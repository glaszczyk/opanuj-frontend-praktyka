import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const removeItemFromCart = (state: CartState, id: number) => state.items.filter((item) => item.id !== id);


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product | CartItem>) => {
      const cartItem = state.items.find((item) => {
        return item.id === action.payload.id;
      });

      if (cartItem) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        );
      } else {
        const newItem = { ...action.payload, amount: 1 };
        state.items.push(newItem);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = removeItemFromCart(state, action.payload);
    },
    decreaseAmount: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const cartItem = state.items.find((item) => item.id === id);

      if (!cartItem) {
        return;
      }

      if (cartItem.amount <= 1) {
        state.items = removeItemFromCart(state,id);
      }

      state.items = state.items.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
    }
  }
});

export const { addToCart, clearCart, removeFromCart, decreaseAmount } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectItemAmount = (state: RootState) =>
  state.cart.items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);
export const selectTotalPrice = (state: RootState) => {
  return state.cart.items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount * currentItem.price;
  }, 0);
}

export default cartSlice.reducer;
