import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomData: [
      {
        id: 1,
        isActive: false,
        isAdvising: false,
        roomToken: null,
        roomId: null,
        connectedKiosk: null,
      },
      {
        id: 2,
        isActive: false,
        isAdvising: false,
        roomToken: null,
        roomId: null,
        connectedKiosk: null,
      },
      {
        id: 3,
        isActive: false,
        isAdvising: false,
        roomToken: null,
        roomId: null,
        connectedKiosk: null,
      },
    ],
  },
  reducers: {
    setRoomActive: (state, action) => {
      const { id, roomToken, roomId } = action.payload;
      const room = state.roomData.find((room) => room.id === id);
      if (room) {
        room.isActive = true;
        room.roomToken = roomToken;
        room.roomId = roomId;
      }
    },
    setRoomAdvising: (state, action) => {
      const { id, kioskInfo } = action.payload;
      const room = state.roomData.find((room) => room.id === id);
      if (room) {
        room.isAdvising = true;
        room.connectedKiosk = kioskInfo;
      }
    },
    resetRoom: (state, action) => {
      const { id } = action.payload;
      const room = state.roomData.find((room) => room.id === id);
      if (room) {
        room.isAdvising = false;
        room.connectedKiosk = null;
        room.roomId = null;
        room.roomToken = null;
      }
    },
  },
});

export const { setRoomActive, setRoomAdvising, resetRoom } = roomSlice.actions;
export default roomSlice.reducer;
