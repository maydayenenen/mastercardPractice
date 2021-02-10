import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUser = (term) => {
  return axios.get(`${BASE_URL}/search/users`, {
    params: {
      q: term
    } /** ,
    auth: {
      username: "maydayenenen",
      password: "b9baf8255b93923392747fab763205931ce0d103"
    } */
  });
};

export const getReposByUser = (userName) => {
  return axios.get(`${BASE_URL}/users/${userName}/repos`/** , {
    auth: {
      username: "maydayenenen",
      password: "b9baf8255b93923392747fab763205931ce0d103"
    }
  } */);
};
