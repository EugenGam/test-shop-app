import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./compareReducer";
import cartReducer from "./cartReducer";

const store = configureStore({
  reducer: {
    items: itemReducer,
    cart: cartReducer,
  },
});

export default store;
