import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { myLocalStorage } from "../../utils";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      myLocalStorage.set("user", JSON.stringify(state.value));
    },
    getInfoUser: (state) => {
      state.value = myLocalStorage.get("user");
    },
  },
});

export default userSlice.reducer;

export const { login, getInfoUser } = userSlice.actions;

// export const selectUser = (state) => state.user.user;
