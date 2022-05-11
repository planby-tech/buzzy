import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../common/constant";
import authHeader from "./auth-header";

const GROUP_URL = API_URL + "/group";

const createGroup = async (name, description) => {
  const header = await authHeader();
  return axios
    .post(
      GROUP_URL + "/create",
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
const joinGroup = async (groupCode) => {
  const header = await authHeader();
  return axios
    .post(GROUP_URL + "/join", { groupCode }, { headers: header })
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
    .get(GROUP_URL + `/findUsers?id=${groupId}`, { headers: header })
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
};
export default groupService;
