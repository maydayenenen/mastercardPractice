import React from "react";
import styled from "styled-components";

const RepoCard = ({ repoName, repoLink, description, className }) => {
  return (
    <div className={className}>
      <h4 className="name">{repoName}</h4>
      <p className="desc">{description}</p>
    </div>
  );
};

export default styled(RepoCard)`
  border: 1px solid rgb(206, 212, 218);
  border-radius: 4px;
  padding: 1rem;
  p {
    color: #adb5bd;
    font-weight: 100;
  }
`;