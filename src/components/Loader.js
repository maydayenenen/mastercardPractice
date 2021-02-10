import styled from "styled-components";

const Loader = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid black;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s infinite linear;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
export default Loader;