import axios from "axios";
// const API_URL = "http://localhost:8080/api/auth/";
const API_URL =
  Platform.OS === "ios"
    ? "http://192.168.219.101:3001"
    : "http://192.168.219.103:3001";

const register = (username, email, password1, password2) => {
  return axios.post(API_URL + "/signup", {
    username,
    email,
    password1,
    password2,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.token) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};
export default authService;
