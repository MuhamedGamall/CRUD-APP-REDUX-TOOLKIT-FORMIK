import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      return (await axios.get("http://localhost:4000/products")).data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertProduct = createAsyncThunk(
  "products/insertProduct",
  async (item, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { auth } = getState();
    const config = {
      "Content-type": "application/json; charset=UTF-8",
    };
    try {
      item.userId = auth.id;
      const res = await axios.post(
        `http://localhost:4000/products`,
        item,
        config
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const ProductDetails = createAsyncThunk(
  "products/ProductDetails",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = (
        await axios.get(`http://localhost:4000/products/${id}`)
      ).data;
      console.log(res);

      return res;
    } catch (error) {
      rejectWithValue(error.meesege);
    }
  }
);
const products = createSlice({
  name: "products",
  initialState: { products: [], product: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (el) => el.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(insertProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(insertProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(ProductDetails.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(ProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default products.reducer;
