import { createSlice } from '@reduxjs/toolkit';

const MAX_CONNECTIONS = 3;

const advisorSlice = createSlice({
  name: 'advisor',
  initialState: {
    isAvailable: true,
    currentConnections: 0,
  },
  reducers: {
    setAvailability: (state, action) => {
      state.isAvailable = action.payload;
    },
    incrementConnections: (state) => {
      if (state.currentConnections < MAX_CONNECTIONS) {
        state.currentConnections += 1;
        if (state.currentConnections === MAX_CONNECTIONS) {
          state.isAvailable = false;
        }
      }
    },
    decrementConnections: (state) => {
      if (state.currentConnections > 0) {
        state.currentConnections -= 1;
        if (state.currentConnections < MAX_CONNECTIONS) {
          state.isAvailable = true;
        }
      }
    },
    resetConnections: (state) => {
      state.currentConnections = 0;
      state.isAvailable = true;
    },
  },
});

export const { setAvailability, incrementConnections, decrementConnections, resetConnections } =
  advisorSlice.actions;
export default advisorSlice.reducer;
