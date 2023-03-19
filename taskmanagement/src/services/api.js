import axios from "axios";
import {
  CREATE_TASK,
  DELETE_TASK,
  GETTASK,
  LOGIN,
  REGISTER,
  UPDATE_TASK,
} from "./apiConstants";
export const login = async (data) => {
  return axios.post(LOGIN, data);
};
export const register = async (data) => {
  return axios.post(REGISTER, data);
};
export const gettask = async () => {
  let token = getToken();
  return axios.get(GETTASK, {
    headers: { auth: token },
  });
};

export const createTasks = async (data) => {
  let token = getToken();
  return axios.post(CREATE_TASK, data, { headers: { auth: token } });
};
export const deleteTasks = async (data) => {
  let token = getToken();
  return axios.post(DELETE_TASK, data, { headers: { auth: token } });
};
export const updateTasks = async (data) => {
  let token = getToken();
  return axios.post(UPDATE_TASK, data, { headers: { auth: token } });
};

export function getToken() {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
}
