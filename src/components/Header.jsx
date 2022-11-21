//import { useEffect, useState } from "react";
import { useDefaultProvider } from "../contexts/default";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function Header() {
  const { isMobile, darkmode, setDarkmode } = useDefaultProvider();

  return (
    <div>
      <Navbar
        bg={darkmode ? "primary" : "dark"}
        variant={darkmode ? "light" : "dark"}
      >
        <Container>
            <Container>
            <img
              alt="ReadThenBurnLogo"
              src="/fire.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <Navbar.Brand>ReadThenBurn.se</Navbar.Brand>
            </Container>
          <Nav>
            <Nav.Link onClick={() => setDarkmode(!darkmode)}>
              {darkmode ? (
                <MdOutlineDarkMode size={25} />
              ) : (
                <MdOutlineLightMode size={25} />
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
