import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_all_service } from "../../api/service.js";

export const getAllService = createAsyncThunk(
  "service/getAllService",
  async () => {
    const res = await get_all_service();
    return res.data.data;
  }
);
