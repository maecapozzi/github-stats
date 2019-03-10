import styled from "styled-components";

export const Input = styled("input")`
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
  padding: 20px 40px;
  margin: 0 0 20px 0px;
  border: none;
  box-shadow: ${props =>
    `0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)`};
  font-size: 16px;
`;
