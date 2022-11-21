import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import Share from "../components/Share";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDefaultProvider } from "../contexts/default";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Home() {
  const [shareId, setShareId] = useState("");
  const [message, setMessage] = useState("");
  const [chars, setChars] = useState(0);
  const { darkmode, isMobile } = useDefaultProvider();

  const handleMessage = () => {
    if (message.length === 0) return;

    setShareId("");

    const DATA = {
      message: message,
    };

    axios.post(URL, DATA, CONFIG).then((response) => {
      setShareId(response.data.msgId);
    });
  };

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
              {/* <h2 style={{ color: darkmode ? "black" : "white" }}>ReadThenBurn</h2> */}
              <h3
                style={{
                  color: darkmode ? "black" : "white",
                  paddingTop: isMobile ? "20px" : "",
                }}
              >
                Temporary, Read-Once, Message
              </h3>
              <br />
              {/* onKeyPress={(n) => {
                    if (n.key === "Enter") {
                      handleMessage();
                    }
                  }} */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label
                  style={{
                    color: darkmode ? "black" : "white",
                    paddingTop: isMobile ? "20px" : "",
                  }}
                >
                  Write your message 🔥
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  style={{ backgroundColor: "lightgray" }}
                  as="textarea"
                  rows={isMobile ? 10 : 16}
                  cols={isMobile ? 32 : 16}
                />
                <Form.Label
                  style={{
                    color: darkmode ? "black" : "white",
                    paddingTop: isMobile ? "20px" : null,
                    color: message.length >= 100 ? "red": darkmode ? "black" : "white"
                  }}
                >
                  {shareId ? null : <p>{message.length} / 120</p>}
                </Form.Label>
              </Form.Group>

              {shareId ? (
                <Share shareId={shareId} />
              ) : (
                <Button
                  style={{ marginTop: isMobile ? "20px" : "" }}
                  variant="primary"
                  size="lg"
                  onClick={handleMessage}
                >
                  Create Message
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
