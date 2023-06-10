import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { id: 69, isLoggedIn: true },
  reducers: {},
});

export default authSlice.reducer;
