import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../common/constant";
import authHeader from "./auth-header";

const GROUP_URL = API_URL + "/groups";

const createGroup = async (name, description) => {
  const header = await authHeader();
  return axios
    .post(
      GROUP_URL,
      {
        name,
        description,
      },
      { headers: header }
    )
    .then((res) => {
      console.log(res.data.group);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const joinGroup = async (userId, groupCode) => {
  const header = await authHeader();
  return axios
    .post(
      API_URL + `users/${userId}/groups`,
      { groupCode },
      { headers: header }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
const findByGroup = async (groupId) => {
  const header = await authHeader();
  return axios
    .get(GROUP_URL + `/groups/${groupId}/users`, { headers: header })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateGroup = async (groupId) => {
  const header = await authHeader();
  return axios
    .put(GROUP_URL + `/groups/${groupId}`, { headers: header })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteGroup = async (groupId) => {
  const header = await authHeader();
  return axios
    .delete(GROUP_URL + `/groups/${groupId}`, { headers: header })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

const groupService = {
  createGroup,
  joinGroup,
  findByGroup,
  updateGroup,
  deleteGroup,
};
export default groupService;
