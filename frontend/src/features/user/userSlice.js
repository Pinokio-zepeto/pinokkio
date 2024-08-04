import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  type: null,
  typeInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.type = action.payload.type;
      state.typeInfo = action.payload.typeInfo;
    },
    clearUser: (state) => {
      state.user = null;
      state.type = null;
      state.typeInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
