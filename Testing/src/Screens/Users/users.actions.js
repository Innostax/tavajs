import { createAsyncThunk } from "@reduxjs/toolkit";
import asyncAction from "../../infrastructure/asyncAction";
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (thunkArgs) =>
    await asyncAction({
      url: "users",
      ...thunkArgs,
    })
);
