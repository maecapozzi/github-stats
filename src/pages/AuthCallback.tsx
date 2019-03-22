import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { Header } from "../components/Text";
import { AuthContext } from "../contexts/AuthContext";

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
  static contextType = AuthContext;

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
    const doesCodeExist = (href: string) => {
      if (href.includes("code=")) {
        return true;
      }
    };

    const githubCode =
      doesCodeExist(window.location.href) &&
      window.location.href
        .substring(1)
        .split("code=")[1]
        .split("&")[0];

    doesCodeExist(window.location.href) &&
      axios
        .get(`${process.env.REACT_APP_API_URI}/access-token?code=${githubCode}`)
        .then(response => {
          if (response.data.isLoggedIn) {
            this.setState({ isAuthenticated: true });
            localStorage.setItem("isLoggedIn", "is-logged-in");
            this.context.update(true);
          }
        })
        .catch(err => console.log(err));
  };

  render() {
    if (!this.state.isAuthenticated) {
      return <Header>Loading...</Header>;
    } else {
      return (
        <>
          <Header>Redirecting you...</Header>
          {this.redirectToDashboard()}
        </>
      );
    }
  }
}
