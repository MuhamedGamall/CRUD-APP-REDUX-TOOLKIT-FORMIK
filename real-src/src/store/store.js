import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    auth: authSlice,
  },
});
export default store;
