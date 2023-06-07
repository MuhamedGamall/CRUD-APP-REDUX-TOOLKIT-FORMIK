import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();
      return data;
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
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      });

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
    item.userId = auth.id;
    try {
      await fetch(`http://localhost:4000/products`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const detailsProduct = createAsyncThunk(
  "products/detailsProduct",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (item, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { auth } = getState();
    try {
      item.editBy = auth.id;
      const res = await fetch(`http://localhost:4000/products/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: { records: [], loading: false, error: null, record: null },
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    // start fetch products-----------------
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end fetch products-------------------
    //--------------------------------------
    // start deltete product----------------
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end delete products------------------
    //--------------------------------------
    // start insert product----------------
    builder
      .addCase(insertProduct.pending, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(insertProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(insertProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end insert products------------------
    //--------------------------------------
    // start details product----------------
    builder
      .addCase(detailsProduct.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(detailsProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(detailsProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end details products------------------
    // start edit product----------------
    builder
      .addCase(editProduct.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end edit products------------------
  },
});

export default productsSlice.reducer;
export const { cleanRecord } = productsSlice.actions;
