import React, { Component } from "react";
import axios from "axios";
import * as Yup from "yup";
import gql from "graphql-tag";
import { Router } from "@reach/router";
import { Dashboard, AuthCallback, Homepage } from "./pages";
import { AuthContext } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { Link, Header } from "./components/Text";
import { Nav } from "./components/Nav";

interface Page {
  path: string;
}

const isLoggedIn = () => {
  return !!localStorage.getItem("authToken");
};

const Logout: React.FunctionComponent<Page> = ({ path }) => (
  <Header>You have successfully logged out</Header>
);

class App extends Component {
  static contextType = AuthContext;

  state = {
    isLoggedIn: isLoggedIn()
  };

  updateContext = (isLoggedIn: boolean) => {
    this.setState({ isLoggedIn });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          update: this.updateContext
        }}
      >
        <Nav />
        <Router>
          <Homepage path="/" />
          <Logout path="/logout" />
          <PrivateRoute as={Dashboard} path="/dashboard" />
          <AuthCallback path="/auth/github/callback" />
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
