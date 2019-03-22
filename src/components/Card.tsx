import styled from "styled-components";

interface CardProps {
  header: string;
}

export const Card = styled("div")`
  background-color: #e0e1dd;
  font-family: "Roboto", sans-serif;
  padding: 30px;
  margin: 20px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const CardHeader = styled("h3")`
  font-family: "Roboto", sans-serif;
`;

export const CardText = styled("p")`
  font-family: "Roboto", sans-serif;
`;

export const CardLink = styled("a")`
  font-family: "Roboto", sans-serif;
  text-align: left;
`;
