"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string;
}


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItem[],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
      const { id, size } = action.payload;
      state.items = state.items.filter((item) => !(item.id === id && item.size === size));
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;