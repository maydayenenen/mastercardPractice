import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUser = (term) => {
  return axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: term
    },
    auth: {
      username: "maydayenenen",
      password: "6fd1877b610bb497301e0749e7d31de250ba071f"
    }
  });
};

export const getReposByUser = (userName) => {
  return axios.get(`${BASE_URL}/users/${userName}/repos`, {
    auth: {
      username: "maydayenenen",
      password: "6fd1877b610bb497301e0749e7d31de250ba071f"
    }
  });
};
