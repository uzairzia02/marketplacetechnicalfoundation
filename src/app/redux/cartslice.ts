import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ id: string; quantityChange: number }>
    ) {
      const { id, quantityChange } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        const newQuantity = item.quantity + quantityChange;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        } else {
          state.items = state.items.filter((item) => item._id !== id);
        }
      }
    },
    clearCart(state) {
      state.items = []; // Clears all items from the cart
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
