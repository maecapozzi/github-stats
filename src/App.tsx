import React, { Component } from "react";
import axios from "axios";
import * as Yup from "yup";
import gql from "graphql-tag";
import { Router } from "@reach/router";
import { Dashboard, AuthCallback, Homepage } from "./pages";

interface Page {
  path: string;
}

const Logout: React.FunctionComponent<Page> = () => <div>Logout</div>;

class App extends Component {
  render() {
    return (
      <Router>
        <Logout path="logout" />
        <Homepage path="/" />
        <Dashboard path="dashboard" />
        <AuthCallback path="/auth/github/callback" />
      </Router>
    );
  }
}

export default App;
