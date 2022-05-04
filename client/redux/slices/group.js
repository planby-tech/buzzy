import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import groupService from "../../services/group.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createGroup = createAsyncThunk(
  "group/create",
  async ({ name, description }, thunkAPI) => {
    try {
      const response = await groupService.createGroup(name, description);
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
export const joinGroup = createAsyncThunk(
  "group/join",
  async ({ groupCode }, thunkAPI) => {
    try {
      const response = await groupService.joinGroup(groupCode);
      thunkAPI.dispatch(setMessage(response.data.message));
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
export const findByGroup = createAsyncThunk(
  "group/findUser",
  async ({ groupId }, thunkAPI) => {
    try {
      const response = await groupService.findByGroup(groupCode);
      thunkAPI.dispatch(setMessage(response.data.message));
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
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [createGroup.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
