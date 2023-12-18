import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceSlide from "./slide/service";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceSlide,
  },
});
