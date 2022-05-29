import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../common/constant";

const getPublicContent = () => {
  return axios.get(API_URL + "/test/all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "/test/user", { headers: authHeader() });
};
const getModeratorBoard = () => {
  return axios.get(API_URL + "/test/mod", { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "/test/admin", { headers: authHeader() });
};
const updateUser = async (userId, name) => {
  const header = await authHeader();
  return axios
    .put(API_URL + `/users/${userId}`, { name }, { headers: header })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const deleteUser = async (userId, name) => {
  const header = await authHeader();
  return axios
    .delete(API_URL + `/users/${userId}`, { headers: header })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const findByUser = async (userId) => {
  const header = await authHeader();
  return axios
    .get(API_URL + `/users/${userId}/groups`, { headers: header })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  updateUser,
  findByUser,
};
export default userService;
