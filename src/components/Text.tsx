import styled from "styled-components";

export const H1 = styled("h1")`
  color: #ffffff;
  font-family: "Roboto";
`;
export const Header = styled("h2")`
  color: #ffffff;
  font-family: "Roboto";
  font-style: italic;
  text-align: center;
  font-size: 20px;

  @media (min-width: 700px) {
    padding: 20px;
    font-size: 30px;
  }
`;

export const Text = styled("p")`
  font-family: "Roboto";
  color: #1d1921;
  font-size: 16px;
`;

export const Link = styled("a")`
  font-family: "Roboto";
  color: #1d1921;
  font-size: 16px;
`;

export const StyledList = styled("ul")`
  font-family: "Roboto";
  color: #1d1921;
  margin: 0px;
`;

export const Label = styled("label")`
  color: #ffffff;
  font-size: 20px;
`;

export const Error = styled("span")`
  color: #ffffff;
  font-size: 16px;
`;
