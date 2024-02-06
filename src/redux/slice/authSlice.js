import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        currentUser: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state) => {
            console.log('Logging out...');
            state.status = false;
            state.userData = null;
        },
    }
})

export const { login, logout, currentUser } = authSlice.actions;

export default authSlice.reducer;