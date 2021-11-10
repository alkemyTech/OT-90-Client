import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setLogged: (state, action) => {
      state.user = action.payload
    },
    logOut: (state) => {
      state.user = {}
    },
  },
});

export const { setLogged, logOut } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
