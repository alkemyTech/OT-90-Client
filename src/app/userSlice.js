import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: {}
  },
  reducers: {
    setLogged: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logOut: (state) => {
      state.isAuthenticated = false
      state.user = {}
    },
  },
});

export const { setLogged, logOut } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
