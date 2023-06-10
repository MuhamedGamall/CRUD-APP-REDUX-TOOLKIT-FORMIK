import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/productsSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: { products, auth: authSlice },
});
export default store;
