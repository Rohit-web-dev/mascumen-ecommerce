"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import { databases } from '@/appwrite/config';


// export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
//     const response = await databases.listDocuments('658a5a2edc47302eb5d2', '658a5b48aa285b17681b',);
//     return response.documents;
// })

const api = new WooCommerceRestApi({
    url: "http://139.59.83.112",
    consumerKey: "ck_1efb9a584efa3b29f41e933d71a75f19989c2b18",
    consumerSecret: "cs_241dfeef2aed88495f3c50954b993d0e3d0995d8",
    version: "wc/v3"
  });

  export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    try {
      const response = await api.get("products");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

// const consumerKey = 'ck_1efb9a584efa3b29f41e933d71a75f19989c2b18';
// const consumerSecret = 'cs_241dfeef2aed88495f3c50954b993d0e3d0995d8';
// const storeUrl = 'http://139.59.83.112';

// export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
//     const response = await fetch(`${storeUrl}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)
//     return await response.json()
// })

 
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        data: [],
    },

    extraReducers: (builder) => {
        builder
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
    }
})

export default productsSlice.reducer