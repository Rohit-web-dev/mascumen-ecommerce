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
    return response.documents;
  } catch (error) {
    throw error;
  }
});

export const fetchWishlist = createAsyncThunk("fetchCartWishlist", async () => {
  try {
    const response = await databases.listDocuments('658a5a2edc47302eb5d2', '65bb757810e62620cd15');
    // console.log('Get cart data response:', response);
    if (!response) {
      throw new Error('Invalid response: Empty response');
    }
    return response.documents;
  } catch (error) {
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
      })

      // get wishlist items 
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

  },
});

export default wishlistSlice.reducer;