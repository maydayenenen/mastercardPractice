import React from "react";
import styled from "styled-components";
import RepoCard from "./RepoCard";



const UserRepos = ({ userName, userAvatar, repos, className }) => {
  return (
    <div className={className}>
      <div className="user">
        <img className="avatar" src={userAvatar} alt={userName} />
        <h3 className="user-name">{userName}</h3>
      </div>
      {repos.length > 0 && <hr />}
      <div className="grid">
        {repos.map((repo) => {
          return (
            <RepoCard
              key={repo.repoName}
              repoName={repo.repoName}
              description={repo.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default styled(UserRepos)`
  width: 100%;
  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .avatar {
    width: 80px;
  }

  .user-name {
    margin: 0.5rem 0;
  }

  .grid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
  }
`;
