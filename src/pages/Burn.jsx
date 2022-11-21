import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Burn() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { darkmode, isMobile } = useDefaultProvider();

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/", { replace: true }),
    [navigate]
  );

  useEffect(() => {
    axios.get(URL + `/${id}`, CONFIG).then((response) => {
      setMessage(response.data.burnMsg);
    });
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col xl="8" sm>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  color: darkmode ? "black" : "white",
                  paddingTop: isMobile ? "20px" : "",
                }}
              >
                Temporary, Read-Once, Message
              </h3>
              <br />
              <Form.Group className="mb-0">
                <Form.Label
                  style={{
                    color: darkmode ? "black" : "white",
                    paddingTop: isMobile ? "20px" : "",
                  }}
                >
                  For Your Eyes Only 👀
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  style={{ backgroundColor: darkmode ? "white" : "lightgray" }}
                  as="textarea"
                  rows={isMobile ? 10 : 16}
                  cols={isMobile ? 36 : 100}
                />
              </Form.Group>
              <Button
                style={{ marginTop: isMobile ? "88px" : "48px" }}
                variant="primary"
                size="lg"
                onClick={handleOnClick}
              >
                Create Burn Message 💌
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Burn;
