import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
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

export default mapSlice.reducer;

export const { open, close } = mapSlice.actions;
