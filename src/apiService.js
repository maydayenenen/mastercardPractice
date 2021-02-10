import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUser = (term) => {
  return axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: term
    },
    auth: {
      username: "zsdjl",
      password: "3ad65cda509104976e33ab58476fee0a211abe75"
    }
  });
};

export const getReposByUser = (userName) => {
  return axios.get(`${BASE_URL}/users/${userName}/repos`, {
    auth: {
      username: "zsdjl",
      password: "3ad65cda509104976e33ab58476fee0a211abe75"
    }
  });
};
