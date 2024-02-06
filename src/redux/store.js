import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slice/productsSlice'
import cartReducer from './slice/cartSlice'
import wishlistReducer from './slice/wishlistSlice'
import userReducer from './slice/userSlice'
import authReducer from './slice/authSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    auth: authReducer,
  },
})