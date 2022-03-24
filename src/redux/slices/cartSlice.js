import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    increase: (state, action) => {
      let shoe = state.value[action.payload];
      shoe.cant === shoe.stock ? (shoe.cant = shoe.stock) : (shoe.cant += 1);
      state.value[action.payload] = shoe;
    },
    decrease: (state, action) => {
      let shoe = state.value[action.payload];
      shoe.cant > 1 ? (shoe.cant -= 1) : (shoe.cant = 1);
      state.value[action.payload] = shoe;
    },
    deleteShoe: (state, action) => {
      let shoes = state.value;
      let shoe = state.value[action.payload];
      let newShoes = shoes.filter((item) => item.shoeCode !== shoe.shoeCode);
      state.value = newShoes;
    },
    clearShoes: (state, action) => {
      state.value = [];
    },
  },
});

export default cartSlice.reducer;

export const { add, decrease, increase, deleteShoe, clearShoes } =
  cartSlice.actions;
