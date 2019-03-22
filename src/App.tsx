import React, { Component } from "react";
import axios from "axios";
import { Router } from "@reach/router";
import { Dashboard, AuthCallback, Homepage } from "./pages";
import { AuthContext } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Text";
import { Nav } from "./components/Nav";

interface Page {
  path: string;
}

const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "is-logged-in";
};

class Logout extends React.Component<Page> {
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URI}/logout`)
      .then(response => console.log(response));
  }
  render() {
    return <Header>You have successfully logged out</Header>;
  }
}

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
