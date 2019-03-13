import React from "react";
import styled from "styled-components";
import { Login } from "../components/Login";
import { StyledH1, Header } from "../components/Text";

interface Page {
  path: string;
}

const StyledDiv = styled("div")`
  text-align: center;
`;

const Wrapper = styled("div")`
  padding-bottom: 50px;
`;

export const Homepage: React.FunctionComponent<Page> = () => (
  <>
    <StyledH1>Github Report</StyledH1>
    <StyledDiv>
      <Wrapper>
        <Header>
          Github Report is a tool you can use to track the work your team is
          doing over the course of a sprint.{" "}
        </Header>
      </Wrapper>
      <Login />
    </StyledDiv>
  </>
);
