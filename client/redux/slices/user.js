import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../../services/user.service";

export const findByUser = createAsyncThunk("users/findGroups", async () => {
  try {
    const data = userService.findByUser();
    if (data) return data;
    return null;
  } catch (error) {
    const message =
      (error.response && error.response.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

const initialState = { isLoggedIn: false, user: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [findByUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});
const { reducer } = userSlice;
export default reducer;
