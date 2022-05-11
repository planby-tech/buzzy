import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const findByUser = createAsyncThunk("auth/findGroups", async () => {
  try {
    const data = userService.findByUser();
    if (data.length > 0) return data;
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
  name: "auth",
  initialState,
  extraReducers: {
    [findByUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});
const { reducer } = userSlice;
export default reducer;
