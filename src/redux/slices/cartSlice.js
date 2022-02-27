import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      state.value.push(JSON.stringify(action.payload));
    },
    increase: (state, action) => {
      let shoe = JSON.parse(state.value[action.payload]);
      shoe.cant === shoe.stock ? (shoe.cant = shoe.stock) : (shoe.cant += 1);
      state.value[action.payload] = JSON.stringify(shoe);
    },
    decrease: (state, action) => {
      let shoe = JSON.parse(state.value[action.payload]);
      shoe.cant > 1 ? (shoe.cant -= 1) : (shoe.cant = 1);
      state.value[action.payload] = JSON.stringify(shoe);
    },
    deleteShoe: (state, action) => {
      // let shoe = JSON.stringify(state.value);
      // console.log(shoe);
      // let shoes = shoe.slice(action.payload, 1);
      // console.log(shoes);
      // state.value = shoes;
    },
    update: (state, action) => {},
  },
});

export default cartSlice.reducer;

export const { add, decrease, increase, deleteShoe } = cartSlice.actions;
