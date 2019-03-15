import React, { Component } from "react";
import axios from "axios";
import * as Yup from "yup";
import gql from "graphql-tag";
import { Router } from "@reach/router";
import { Dashboard, AuthCallback, Homepage } from "./pages";
import { AuthContext } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";

interface Page {
  path: string;
}

const Logout: React.FunctionComponent<Page> = () => <div>Logout</div>;

class App extends Component {
  state = {
    isLoggedIn: false
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
        <Router>
          <Logout path="logout" />
          <Homepage path="/" />
          <PrivateRoute as={Dashboard} path="/dashboard" />
          <AuthCallback path="/auth/github/callback" />
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
