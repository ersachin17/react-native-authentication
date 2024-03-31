import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const loginUser = createAsyncThunk("login/user", async (credentials) => {
  try {
    const response = await fetch('https://api.juaaree.com/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Login failed');
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;
