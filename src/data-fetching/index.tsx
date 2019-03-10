import React from "react";
import styled from "styled-components";
import { Text } from "../components/Text";
import { Spinner } from "../components/Spinner";

const SpinnerWrapper = styled("div")`
  background-color: #1745d7;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

export const Error: React.FunctionComponent = () => (
  <Text>There was an error</Text>
);
export const Fetching: React.FunctionComponent = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);
