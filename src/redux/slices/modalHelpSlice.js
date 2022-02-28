import { createSlice } from "@reduxjs/toolkit";

export const helpSlice = createSlice({
  name: "help",
  initialState: {
    value: false,
  },
  reducers: {
    open: (state, action) => {
      state.value = true;
    },
    close: (state, action) => {
      state.value = false;
    },
  },
});

export default helpSlice.reducer;

export const { open, close } = helpSlice.actions;
