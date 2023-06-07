import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/productsSlice";

const store = configureStore({
  reducer: { products },
});
export default store;
