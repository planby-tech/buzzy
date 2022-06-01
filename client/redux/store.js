import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import groupReducer from "./slices/group";
import userReducer from "./slices/user";
const reducer = {
  auth: authReducer,
  group: groupReducer,
  user: userReducer,
  message: messageReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
