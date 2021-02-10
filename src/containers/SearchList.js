import React, { useCallback, useState } from "react";
import InputField from "../components/InputField";
import useDebounce from "../hooks/useDebounce";
import { getReposByUser, searchUser } from "../apiService";
import UserRepos from "../components/UserRepos";
import styled from "styled-components";
import Loader from "../components/Loader";

const SearchList = ({ className }) => {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userRepos, setUserRepos] = useState([]);

  const loadUser = useCallback(() => {
    if (!term) {
      return;
    }
    setLoading(true);
    searchUser(term).then(({ data }) => {
      const { items } = data;
      return Promise.all(
        items.map((user) => {
          const { login, id, avatar_url } = user;
          return getReposByUser(login).then(({ data }) => {
            return {
              login,
              id,
              avatarUrl: avatar_url,
              userHtmlUrl: user.html_url,
              repos: data.map(({ full_name, html_url, description }) => ({
                description,
                repoName: full_name,
                html_url: html_url
              }))
            };
          });
        })
      )
        .then((data) => {
          setLoading(false);
          setUserRepos(data);
        })
        .catch((e) => {
          setHasError(true);
        });
    });
  }, [term, setLoading, setUserRepos, setHasError]);

  useDebounce(term, loadUser, 500);

  return (
    <div className={className}>
      <h1 className="title">Github repo search</h1>
      <InputField
        placeholder="type a user name"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {loading && <Loader data-testid="loader" />}
      {hasError && <p className="error-text">Something went wrong</p>}
      {!loading &&
        !hasError &&
        userRepos.map(({ login, avatarUrl, repos }) => {
          return (
            <UserRepos
              key={login}
              userName={login}
              userAvatar={avatarUrl}
              repos={repos}
            />
          );
        })}
    </div>
  );
};

export default styled(SearchList)`
  ${InputField} {
    margin: 1rem 0;
  }
  ${UserRepos} {
    margin-top: 1rem;
    :first-child {
      margin-top: 0;
    }
  }
  padding: 2rem;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  .error-text {
    color: red;
  }
`;
