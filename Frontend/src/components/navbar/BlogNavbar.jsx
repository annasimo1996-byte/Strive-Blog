import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = ({ isLogged, setIsLogged }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        {/* Logo del Blog */}
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
          {isLogged && (
            <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg me-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
              </svg>
              Nuovo Articolo
            </Button>
          )}

          {isLogged ? (
            <Button variant="outline-dark" size="md" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="dark" size="md">
              Accedi
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};
export default NavBar;
