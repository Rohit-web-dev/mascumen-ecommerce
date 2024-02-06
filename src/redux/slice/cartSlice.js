import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases } from '@/appwrite/config';
import { ID } from 'appwrite';

export const addToCart = createAsyncThunk("addToCart", async (productId, userID) => {
  console.log(userID);
  try {
    const response = await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '65b9de309cc3fed93e3c',
      ID.unique(),
      {
        userId: "6594eb94f31503705194",
        productId: productId,
        productItem: 1
      }
    );
    return response.documents;
  } catch (error) {
    // console.error('Error adding product to cart:', error);
    throw error;
  }
});

export const fetchCartData = createAsyncThunk("fetchCartData", async () => {
  try {
    const response = await databases.listDocuments('658a5a2edc47302eb5d2', '65b9de309cc3fed93e3c');
    if (!response) {
      throw new Error('Invalid response: Empty response');
    }
    return response.documents;
  } catch (error) {
    // console.error('Error getting cart data:', error);
    throw error;
  }
});


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder

      // add to cart 
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get cart items 
      .addCase(fetchCartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

  },
});

export default cartSlice.reducer;