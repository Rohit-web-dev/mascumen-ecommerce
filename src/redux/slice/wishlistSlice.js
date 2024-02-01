import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { databases } from '@/appwrite/config';
import { ID } from 'appwrite';

export const addToWishlist = createAsyncThunk("addToWishlist", async (productId, userID) => {
  try {
    const response = await databases.createDocument(
      '658a5a2edc47302eb5d2',
      '65bb757810e62620cd15',
      ID.unique(),
      {
        userId: "6594eb94f31503705194",
        productId: productId,
        productItem: 1
      }
    );
    console.log('Product added to cart:', response);
    return response.documents;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
});

export const fetchCartWishlist = createAsyncThunk("fetchCartWishlist", async () => {
  try {
    const response = await databases.listDocuments('658a5a2edc47302eb5d2', '65bb757810e62620cd15');
    console.log('Get cart data response:', response);
    if (!response) {
      throw new Error('Invalid response: Empty response');
    }
    return response.documents;
  } catch (error) {
    console.error('Error getting cart data:', error);
    throw error;
  }
});


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [], 
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder

      // add to wishlist 
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error('Error adding to cart:', action.error.message);
      })

      // get wishlist items 
      .addCase(fetchCartWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error('Error getting cart data:', action.error.message);
      })

  },
});

export default wishlistSlice.reducer;