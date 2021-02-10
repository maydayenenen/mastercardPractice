import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUser = (term) => {
  return axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: term
    },
    auth: {
      username: "maydayenenen",
      password: "71e8a243a778192cbdd80202d9658b70c9b5dfb4"
    }
  });
};

export const getReposByUser = (userName) => {
  return axios.get(`${BASE_URL}/users/${userName}/repos`, {
    auth: {
      username: "maydayenenen",
      password: "71e8a243a778192cbdd80202d9658b70c9b5dfb4"
    }
  });
};
