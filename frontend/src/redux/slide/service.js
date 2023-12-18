import { createSlice } from "@reduxjs/toolkit";
import { getAllService } from "../actions/service.js";

const serviceSlide = createSlice({
  name: "service",
  initialState: {
    isLoading: false,
    services: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllService.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.services = action.payload;
      state.error = "";
    });
    builder.addCase(getAllService.rejected, (state, action) => {
      state.isLoading = false;
      state.services = [];
      state.error = action.error.message;
    });
  },
});

export default serviceSlide.reducer;
