import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("last_visited_page");
    navigate("/login");
  };

  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <strong>Shopeymart</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {role === "ROLE_ADMIN" ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown
                  style={{ color: "white" }}
                  title="Dashboard"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="dashboardProduct">
                    Data Produk
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/dashboardStore">
                    Data Toko
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/">Home</Nav.Link>
            )}

            {token ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
