import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const shoesSlice = createSlice({
  name: "shoes",
  initialState: {
    shoes: null,
  },
  reducers: {},
});

export default shoesSlice.reducers;
