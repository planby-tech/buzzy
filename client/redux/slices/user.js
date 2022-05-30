import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import userService from "../../services/user.service";

export const findByUser = createAsyncThunk("users/findGroups", async (userId, thunkAPI) => {
  try {
    const data = await userService.findByUser(userId);
    if (data) return {groupArray: data};
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

const initialState = { isLoggedIn: false, user: null, groupArray: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [findByUser.fulfilled]: (state, action) => {
      state.groupArray = action.payload.groupArray;
    }
  },
});
const { reducer } = userSlice;
export default reducer;
