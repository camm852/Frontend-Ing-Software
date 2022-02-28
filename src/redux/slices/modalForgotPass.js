import { createSlice } from "@reduxjs/toolkit";

export const forgotpasswordSlice = createSlice({
  name: "forgotpassword",
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

export default forgotpasswordSlice.reducer;

export const { open, close } = forgotpasswordSlice.actions;
