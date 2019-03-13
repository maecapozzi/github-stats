import React from "react";
import axios from "axios";
import { Redirect, Link, navigate } from "@reach/router";
import { Header } from "../components/Text";

interface AuthCallbackProps {
  path: string;
}

interface AuthCallbackState {
  isAuthenticated: boolean;
}

export class AuthCallback extends React.Component<
  AuthCallbackProps,
  AuthCallbackState
> {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    this.getAccessToken();
  }

  redirectToDashboard() {
    navigate("/dashboard");
  }

  getAccessToken = () => {
    const githubCode = window.location.href
      .substring(1)
      .split("code=")[1]
      .split("&")[0];

    axios
      .get(`${process.env.REACT_APP_API_URI}/access-token?code=${githubCode}`)
      .then(response => {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        this.setState({ isAuthenticated: true });
      });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return <Header>Loading...</Header>;
    } else {
      return (
        <div>
          <Header>Redirecting you...</Header>
          {this.redirectToDashboard()}
        </div>
      );
    }
  }
}
