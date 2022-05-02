import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL =
  Platform.OS === "ios"
    ? "http://192.168.219.103:3001/api/auth"
    : "http://192.168.219.101:3001/api/auth";

const register = (name, email, password1, password2) => {
  return axios.post(API_URL + "/signup", {
    name,
    email,
    password1,
    password2,
  });
};
const login = async (email, password) => {
  return axios
    .post(API_URL + "/login", {
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
    console.log(userData);
  });
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
