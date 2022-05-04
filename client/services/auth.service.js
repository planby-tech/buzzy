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
};
export default authService;
