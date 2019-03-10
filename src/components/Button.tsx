import styled from "styled-components";

interface ButtonProps {
  fontSize: number;
}

export const Button = styled("button")<ButtonProps>`
  background-color: #1745d7;
  color: #ffffff;
  font-family: "Roboto";
  font-size: ${props => `${props.fontSize}px`};
  height: 40px;
  width: 50px;
  margin: 10px 10px 10px 0;
  border: 1px solid #ffffff;
  width: 150px;
`;
