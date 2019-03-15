import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Homepage } from "../pages/Homepage";

interface PrivateProps {
  as: React.ComponentClass<any> | React.StatelessComponent<any>;
  path: string;
}

export class PrivateRoute extends React.Component<PrivateProps, {}> {
  static contextType = AuthContext;

  render() {
    let Component = this.props.as;

    return this.context.isLoggedIn ? (
      <Component {...this.props} />
    ) : (
      <Homepage path="/" />
    );
  }
}
