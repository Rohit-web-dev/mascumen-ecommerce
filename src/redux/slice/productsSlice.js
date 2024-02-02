"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "http://139.59.83.112",
  consumerKey: "ck_1efb9a584efa3b29f41e933d71a75f19989c2b18",
  consumerSecret: "cs_241dfeef2aed88495f3c50954b993d0e3d0995d8",
  version: "wc/v3"
});

// get all products data
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await api.get("products");
    return response.data;
  } catch (error) {
    throw error;
  }
});

// get single products data
export const fetchProductById = createAsyncThunk("fetchProductById", async (productId) => {
  try {
    const response = await api.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    selectedProduct: null,
  },

  extraReducers: (builder) => {
    builder
      // get all products data
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
      })

      // get single products data
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
})

export const selectProducts = (state) => state.products.data;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

export default productsSlice.reducer