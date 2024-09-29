import { Col, Container, Row } from "react-bootstrap";

import GraphContainer from "../../components/graph/GraphContainer";
import GraphFilterBox from "../../components/graph/GraphFilterBox";
import React from "react";

const GraphPage: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <GraphFilterBox />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <GraphContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default GraphPage;
