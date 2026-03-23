import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartItem = {
        ...action.payload,
        cartItemId: Date.now() + Math.random(), // Generate unique ID
        quantity: 1
      };
      state.items.push(cartItem);
      state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
    },
    removeFromCart: (state, action) => {
      const cartItemId = action.payload;
      state.items = state.items.filter(item => item.cartItemId !== cartItemId);
      state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    updateTotalAmount: (state) => {
      state.totalAmount = state.items.reduce((total, item) => total + item.price, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  toggleCart,
  closeCart,
  clearCart,
  updateTotalAmount
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartOpen = (state) => state.cart.isCartOpen;
export const selectCartItemCount = (state) => state.cart.items.length;
