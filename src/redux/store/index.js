import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import cartReducer from "../slices/cartSlice";
import mapReducer from "../slices/modalMapSlice";
import helpReducer from "../slices/modalHelpSlice";
import forgotpasswordReducer from "../slices/modalForgotPass";
import detailReducer from "../slices/modalCardDetail";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    map: mapReducer,
    help: helpReducer,
    forgotpassword: forgotpasswordReducer,
    detail: detailReducer,
  },
});

export default store;
