import React from "react";
import styled from "styled-components";
import { Spinner } from "../components/Spinner";

const SpinnerWrapper = styled("div")`
  background-color: #1745d7;
  min-height: 100vh;
  width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  @media (min-width: 700px) {
  }
`;

const StyledError = styled("h3")`
  text-align: center;
  color: #ffffff;
  font-size: 25px;
`;

export const Error: React.FunctionComponent = () => (
  <StyledError>Sorry, we weren't able to find that project!</StyledError>
);
export const Fetching: React.FunctionComponent = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);
