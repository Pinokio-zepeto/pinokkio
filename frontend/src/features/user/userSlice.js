import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  type: null,
  posId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.type = action.payload.type;
      state.posId = action.payload.posId;
    },
    clearUser: (state) => {
      state.user = null;
      state.type = null;
      state.posId = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
