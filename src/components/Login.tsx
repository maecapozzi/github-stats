import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "../components/Text";

interface LoginProps {}

interface LoginState {
  url: string;
}

const LoginLink = styled("a")`
  font-size: 20px;
  color: #e0e1dd;
  font-family: "Roboto";
  background-color: #2274a5;
  padding: 20px 60px;
  border: none;
  text-decoration: none;
  &:hover {
    background-color: #e0e1dd;
    color: #2274a5;
    border: 1px solid #2274a5;
  }
`;

export class Login extends React.Component<LoginProps, LoginState> {
  state = {
    url: ""
  };

  componentDidMount() {
    this.state.url === "" &&
      axios
        .get(`${process.env.REACT_APP_API_URI}/auth/github`)
        .then(response => this.setState({ url: response.data.url }));
  }

  render() {
    return <LoginLink href={this.state.url}>Login to Github</LoginLink>;
  }
}
