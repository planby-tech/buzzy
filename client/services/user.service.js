import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../common/constant";

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
const updateUser = async (name) => {
  const header = await authHeader();
  return axios
    .post(API_URL + "/user/update", { name }, { headers: header })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const findByUser = async (groupId) => {
  const header = await authHeader();
  return axios
    .post(GROUP_URL + "/findGroups", { groupId }, { headers: header })
    .then((res) => {
      return res;
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
