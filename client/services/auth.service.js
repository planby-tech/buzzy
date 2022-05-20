import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../common/constant";

const AUTH_URL = API_URL + "/auth";

const register = (name, email, password1, password2) => {
  return axios.post(AUTH_URL + "/signup", {
    name,
    email,
    password1,
    password2,
  });
};
const login = async (email, password) => {
  return axios
    .post(AUTH_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        setLoginLocal("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const setLoginLocal = async (userKey, userValue) => {
  try {
    await AsyncStorage.setItem(userKey, userValue);
  } catch (err) {
    console.log(err);
  }
};
const loadUserData = async () => {
  // const userData = await AsyncStorage.getItem("user");
  // const jsonUserData = JSON.parse(userData);
  // console.log("userData in loadUserData: " + jsonUserData.accessToken);
  // if (jsonUserData.accessToken) return jsonUserData;

  return AsyncStorage.getItem("user").then((userData) => {
    const jsonUserData = JSON.parse(userData);
    console.log("jsonUserData in authService: " + jsonUserData);
    if (jsonUserData.accessToken) return jsonUserData;
  });
};
const logout = () => {
  console.log("logout");
  AsyncStorage.removeItem("user").then(async () => {
    const userData = await AsyncStorage.getItem("user");
  });
};
const authService = {
  register,
  login,
  logout,
  loadUserData,
};
export default authService;
