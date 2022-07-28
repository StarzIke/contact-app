import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";

function Login() {
  const history = useNavigate();
  const [token, setToken] = useToken();

  const [emailValue, setEmaiLValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onlogin = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8080/api/login", {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    history("/", { replace: true });
  };
  return (
    <Container>
      <h2 className="text-center mb-5 mt-5">LogIn</h2>
      <form onSubmit={onlogin}>
        {errorValue && <Alert variant="danger">{errorValue}</Alert>}
        <Row className="justify-content-md-center  ">
          <Col md={6} className="mt-1">
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                value={emailValue}
                onChange={(e) => setEmaiLValue(e.target.value)}
                type="email"
                placeholder="name@example.com"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Col md={6} className="mt-1">
            <div className="d-grid gap-2 mt-4 mb-3">
              <Button type="submit" variant="primary" size="lg">
                Sign In
              </Button>
            </div>
            <p>
              You dont have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default Login;
