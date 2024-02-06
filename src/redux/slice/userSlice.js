import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Client, Databases, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65855c8c96ca1d4be76e');

export const databases = new Databases(client);
  
export const account = new Account(client)

export const createUserAccount = createAsyncThunk("createUserAccount", async ({ email, password, name, phone }) => {
  try {
    const userAccount = await account.createUserAccount({ email, password, name, phone });
    return userAccount; // return whatever data you want to store in the state
  } catch (error) {
    throw error;
  }
});

export const login = createAsyncThunk("login", async ({ email, password }) => {
  try {
    const session = await account.login({ email, password });
    return session; // return whatever data you want to store in the state
  } catch (error) {
    throw error;
  }
});

export const forgetPassword = createAsyncThunk("forgetPassword", async (newPassword) => {
  try {
    const updatedPassword = await account.forgetPassword(newPassword);
    return updatedPassword; // return whatever data you want to store in the state
  } catch (error) {
    throw error;
  }
});

export const checkLoggedIn = createAsyncThunk("checkLoggedIn", async () => {
  try {
    const isLoggedIn = await account.isLoggedIn();
    return isLoggedIn; // return whatever data you want to store in the state
  } catch (error) {
    throw error;
  }
});

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const currentUser = await account.getCurrentUser();
    return currentUser; // return whatever data you want to store in the state
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("logout", async () => {
  try {
    await account.logout();
    return null; // return whatever data you want to store in the state after logout
  } catch (error) {
    throw error;
  }
});

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  try {
    const users = await account.getAllUsers();
    return users; // return whatever data you want to store in the state
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder

      // create user account
      .addCase(createUserAccount.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // forget password
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle the response if needed
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // check if logged in
      .addCase(checkLoggedIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle the response if needed
      })
      .addCase(checkLoggedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle the response if needed
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

  },
});

export default userSlice.reducer;
