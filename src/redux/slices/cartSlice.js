import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    create: (state, action) => {},
    delete: (state, action) => {},
    update: (state, action) => {},
  },
});

export default cartSlice.reducer;
