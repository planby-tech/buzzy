import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const findByUser = createAsyncThunk(
  "user/findGroups",
  async ({ accessToken }, thunkAPI) => {
    try {
      const response = await groupService.createGroup(token);
      thunkAPI.dispatch(setMessage(response.data.message));
      console.log("response.data in group.js: " + response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = { isLoggedIn: false, user: null };
const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [createGroup.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});
const { reducer } = userSlice;
export default reducer;
