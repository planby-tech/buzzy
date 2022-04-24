import axios from "axios";
import authHeader from "./auth-header";
// const API_URL = "http://localhost:8080/api/test/";
const API_URL =
  Platform.OS === "ios"
    ? "http://192.168.219.101:3001"
    : "http://192.168.219.103:3001";
const getPublicContent = () => {
  return axios.get(API_URL + "/all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "/user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "/mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "/admin", { headers: authHeader() });
};
const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
export default userService;
