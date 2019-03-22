import React from "react";
import { Container, Row, Col } from "react-grid-system";

interface Grid {
  column1: React.ReactNode;
  column2: React.ReactNode;
}

export const Grid: React.FunctionComponent<Grid> = ({ column1, column2 }) => (
  <Container fluid>
    <Row>
      <Col sm={12} lg={6}>
        {column1}
      </Col>
      <Col sm={12} lg={6}>
        {column2}
      </Col>
    </Row>
  </Container>
);
