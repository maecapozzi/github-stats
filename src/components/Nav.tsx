import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { AuthContext } from "../contexts/AuthContext";

export const Nav = () => (
  <Navigation>
    <NavItem>
      <NavLink to="/">Home</NavLink>
    </NavItem>
    <AuthContext.Consumer>
      {({ isLoggedIn, update }) => {
        if (!isLoggedIn) {
          return (
            <NavItem>
              <NavLink to="/">Log In</NavLink>
            </NavItem>
          );
        } else {
          return (
            <div>
              <NavItem>
                <NavLink to="dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/logout"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    update(false);
                  }}
                >
                  Log Out
                </NavLink>
              </NavItem>
            </div>
          );
        }
      }}
    </AuthContext.Consumer>
  </Navigation>
);

const Navigation = styled("nav")`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const NavItem = styled("div")`
  display: inline-block;
  padding: 20px 10px;
`;

export const NavLink = styled(Link)`
  color: #e0e1dd;
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  text-decoration: none;
`;

export default Nav;
