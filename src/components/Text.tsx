import styled from "styled-components";

export const H1 = styled("h1")`
  color: #e0e1dd;
  font-family: "Roboto";
`;
export const Header = styled("h2")`
  color: #e0e1dd;
  font-family: "Roboto";
  font-style: italic;
  text-align: center;
  font-size: 20px;
  padding: 10px;

  @media (min-width: 700px) {
    font-size: 30px;
  }
`;

export const Text = styled("p")`
  font-family: "Roboto";
  color: #0d1b2a;
  font-size: 16px;
`;

export const Link = styled("a")`
  font-family: "Roboto";
  color: #2274a5;
  font-size: 16px;
`;

export const StyledList = styled("ul")`
  font-family: "Roboto";
  color: #0d1b2a;
  margin: 0px;
`;

export const Label = styled("label")`
  color: #3c474b;
  font-size: 20px;
`;

export const Error = styled("p")`
  color: #3c474b;
  font-size: 16px;
`;
