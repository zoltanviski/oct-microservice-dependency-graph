import { Container, Nav, Navbar } from "react-bootstrap";

import React from "react";
import classes from "./Header.module.scss";
import logo from "./logo.png";

const Header: React.FC = () => {
  return (
    <Navbar variant="light" expand="lg" sticky="top" className={classes.navbar}>
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            alt="OTP Logo"
            style={{
              position: "relative",
              top: "-1px",
              width: "30px",
              marginRight: "10px",
            }}
          />
          <span>OCT Microservice Dependency Graph</span>
        </Navbar.Brand>
        <Nav className="ml-auto d-flex align-items-center">
          <Nav.Link href="#graph" style={{ marginRight: "20px" }}>
            Graph
          </Nav.Link>
          <Nav.Link href="#settings">Settings</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
