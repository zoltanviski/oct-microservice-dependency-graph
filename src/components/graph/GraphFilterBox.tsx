import { Card, Col, Form, Row } from "react-bootstrap";
import {
  FaChevronDown,
  FaChevronUp,
  FaFilter,
  FaSlidersH,
} from "react-icons/fa";
import React, { useState } from "react";
import {
  setEnvironment,
  setInvertColoring,
  setNameFilter,
  setOwner,
  setShowVersion,
} from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import classes from "./GraphFilterBox.module.scss";

const GraphFilterBox: React.FC = () => {
  const dispatch = useDispatch();

  const { environment, showVersion, invertColoring, nameFilter, owner } =
    useSelector((state: RootState) => state.filters);

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card className={classes.containerBox}>
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        onClick={handleToggleVisibility}
      >
        <FaSlidersH className={classes.icon} />
        <span className={classes.icon}>
          {isVisible ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </Card.Header>
      {isVisible && (
        <Card.Body>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group controlId="formEnvironment">
                  <Form.Label>Environment</Form.Label>
                  <Form.Control
                    as="select"
                    value={environment}
                    onChange={(e) => dispatch(setEnvironment(e.target.value))}
                  >
                    <option value="dev">Dev</option>
                    <option value="uat">UAT</option>
                    <option value="preprod">Preprod</option>
                    <option value="prod">Prod</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formOwner">
                  <Form.Label>Filter by owner</Form.Label>
                  <Form.Control
                    as="select"
                    value={owner}
                    onChange={(e) => dispatch(setOwner(e.target.value))}
                  >
                    <option value="RDC">RDC</option>
                    <option value="AutNZ">AutNZ</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formNameFilter">
                  <Form.Label>Filter by name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter service name"
                    value={nameFilter}
                    onChange={(e) => dispatch(setNameFilter(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formShowVersionService">
                  <Form.Check
                    type="checkbox"
                    label="Show version service"
                    checked={showVersion}
                    onChange={(e) => dispatch(setShowVersion(e.target.checked))}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formInvertColoring">
                  <Form.Check
                    type="checkbox"
                    label="Invert coloring direction"
                    checked={invertColoring}
                    onChange={(e) =>
                      dispatch(setInvertColoring(e.target.checked))
                    }
                  />
                </Form.Group>
              </Col>
              <Col
                md={6}
                className="d-flex align-items-center justify-content-end"
              ></Col>
            </Row>
          </Form>
        </Card.Body>
      )}
    </Card>
  );
};

export default React.memo(GraphFilterBox);
