import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/img/logo.png";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-success sticky-top">
      <Container>
        <Navbar.Brand className="text-white">
          <Link to="/" className="text-decoration-none text-white">
            <img src={logo} alt="Logo" style={{ height: "30px", marginRight: "10px" }} />
            RainbowRadar
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="d-flex gap-2 align-items-center">
              <Link to="/" className="text-decoration-none text-white">
                Home
              </Link>
              <Link to="/Preferiti" className="text-decoration-none text-white">
                Preferiti
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
