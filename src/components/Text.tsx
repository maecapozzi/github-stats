import styled from "styled-components";

interface LinkProps {
  fontSize?: number;
}

export const H1 = styled("h1")`
  color: #e0e1dd;
  font-family: "Roboto";
`;

export const StyledH1 = styled(H1)`
  text-transform: uppercase;
  font-size: 50px;
  text-align: center;
  font-family: "Oswald";

  @media (min-width: 700px) {
    margin-top: 20px;
    font-size: 70px;
  }
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

export const Link = styled("a")<LinkProps>`
  font-family: "Roboto";
  color: #2274a5;
  font-size: ${props => `${props.fontSize}px` || "16px"};
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
