import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setLogged: (state, action) => {
      state = { isAuthenticated: true, ...action.payload }
      return state
    },
    logOut: (state) => {
      localStorage.removeItem('user-data')
      state = { isAuthenticated: false, user: null }
      return state
    },
  },
});

export const { setLogged, logOut } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
