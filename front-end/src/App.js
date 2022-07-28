import { useState } from "react";
import { useUser } from "./auth/useUser";
import { useToken } from "./auth/useToken";
import { useEffect } from "react";
import axios from "axios";
import TopNav from "./components/TopNav";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

function List({ data, deletecon }) {
  return data == null || data.length < 1 ? (
    <p className="text-center">no contact</p>
  ) : (
    <ListGroup>
      {data.map((item) => (
        <ListGroup.Item key={item.id}>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              Name: {item.contactname}
              <br />
              Tel : {item.contactphone}
            </span>
            <Button
              data={item.id}
              onClick={deletecon}
              variant="danger"
              size="xs"
            >
              delete
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [contactphone, setContactphone] = useState("");
  const [contactname, setContactname] = useState("");
  const user = useUser();
  const [token] = useToken();

  // delet contact
  const deletecon = async (e) => {
    const id = e.target.getAttribute("data");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/deletecon/${id}`,
        {
          userid: user.id,
        }
      );
      callcontact();
    } catch (err) {
      setError(true);
    }
  };

  // poplating contact
  const callcontact = () => {
    fetch(`http://localhost:8080/api/getallcontacts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(setData)
      .catch(setError);
  };

  useEffect(() => {
    callcontact();
  }, []);

  // creating contact
  const createcontact = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/creatcon/${user.id}`,
        {
          contactname,
          contactphone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response) {
        callcontact();
        setModalShow(false);
        setContactname("");
        setContactphone("");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <TopNav />;
      <Container>
        <Row className="justify-content-md-center mt-5  ">
          <Col md={6} className="mt-1">
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  My Contact
                  <Button
                    onClick={() => setModalShow(true)}
                    variant="primary"
                    size="xs"
                  >
                    Add Contact
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <List deletecon={deletecon} data={data} />
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={modalShow} onHide={setModalShow}>
        <form onSubmit={createcontact}>
          <Modal.Header closeButton>
            <Modal.Title>Add contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Name "
              className="mb-3"
            >
              <Form.Control
                value={contactname}
                onChange={(e) => setContactname(e.target.value)}
                type="text"
                placeholder="James "
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                value={contactphone}
                onChange={(e) => setContactphone(e.target.value)}
                type="number"
                placeholder="09027273892"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Add</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default App;
