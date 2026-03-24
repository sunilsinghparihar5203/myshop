import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  filteredItems: [],
  searchQuery: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.filteredItems = [];
      state.searchQuery = "";
      state.status = "idle";
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Filter products based on search query
      if (action.payload.trim() === "") {
        state.filteredItems = state.items;
      } else {
        const query = action.payload.toLowerCase();
        state.filteredItems = state.items.filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query),
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload; // Initialize filtered items
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProducts, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => state.products.filteredItems;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
