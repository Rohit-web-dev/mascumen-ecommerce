import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slice/productsSlice'
import cartReducer from './slice/cartSlice'
import wishlistReducer from './slice/wishlistSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
})