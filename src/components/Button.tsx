import styled from "styled-components";

interface ButtonProps {
  fontSize: number;
}

export const Button = styled("button")<ButtonProps>`
  background-color: #2274a5;
  color: #e0e1dd;
  font-family: "Roboto";
  font-size: ${props => `${props.fontSize}px`};
  height: 40px;
  width: 50px;
  margin: 10px 10px 10px 0;
  border: none;
  width: 150px;
  &:hover {
    background-color: #e0e1dd;
    color: #2274a5;
    border: 1px solid #2274a5;
  }
`;
