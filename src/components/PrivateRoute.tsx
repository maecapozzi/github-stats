import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Homepage } from "../pages/Homepage";

interface Props {
  path: string;
}
interface PrivateProps {
  as: React.ComponentType<Props>;
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
