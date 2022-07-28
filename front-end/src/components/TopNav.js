import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { useEffect } from "react";

function TopNav() {
  const user = useUser();

  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    history("login");
  };
  return (
    <Navbar bg="light">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>Logo</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user && (
            <Button onClick={logout} className="mx-3" variant="outline-danger">
              logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
