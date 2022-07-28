import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../auth/useToken";

function Register() {
  const history = useNavigate();
  const [token, setToken] = useToken();

  const [emailValue, setEmaiLValue] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onRegister = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8080/api/signup", {
      email: emailValue,
      password: passwordValue,
    });
    console.log(response);
    const { token } = response.data;
    setToken(token);
    history("/", { replace: true });
  };
  return (
    <Container>
      <h2 className="text-center mb-5 mt-5">Sign Up</h2>
      <form onSubmit={onRegister}>
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
                required
                placeholder="name@example.com"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                type="password"
                required
                placeholder="Password"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <Col md={6} className="mt-1">
            <div className="d-grid gap-2 mt-4 mb-3">
              <Button type="submit" variant="primary" size="lg">
                Register
              </Button>
            </div>
            <p>
              Have an account?<Link to="/login">Login </Link>
            </p>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default Register;
