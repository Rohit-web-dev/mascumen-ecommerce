import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { databases } from '@/appwrite/config';
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('65855c8c96ca1d4be76e');

const databases = new Databases(client);

export const addToCart = createAsyncThunk("addToCart", async (productId, userID) => {
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
		console.log('Product added to cart:', response);
		return response.documents;
	} catch (error) {
		console.error('Error adding product to cart:', error);
		throw error;
	}
});

export const fetchCartData = createAsyncThunk("fetchCartData", async () => {
	try {
		const response = await databases.listDocuments('658a5a2edc47302eb5d2', '65b9de309cc3fed93e3c');
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


const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [], // Array of cart items
		isLoading: false,
		isError: false,
	},

	reducers: {
		// Additional synchronous actions can be added here, like removeItem, clearCart, etc.
	},

	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items.push(action.payload); // Assuming the API response provides the added item details
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.error('Error adding to cart:', action.error.message);
			})

			.addCase(fetchCartData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCartData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload; // Assuming the API response provides the cart items
			})
			.addCase(fetchCartData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.error('Error getting cart data:', action.error.message);
			});
	},
});

export default cartSlice.reducer;