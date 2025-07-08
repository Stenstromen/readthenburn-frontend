import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Share from "../components/Share";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDefaultProvider } from "../contexts/default";
import Stats from "../components/Stats";

const URL = import.meta.env.VITE_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: import.meta.env.VITE_APP_AUTHORIZATION,
  },
};

const exampleStats = {
  totalMessages: 1337,
  history: [
    {
      date: "1970-01-01",
      totalMessages: 42,
    },
  ],
};

function Home() {
  const [shareId, setShareId] = useState("");
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const { darkmode, isMobile } = useDefaultProvider();

  useEffect(() => {
    axios
      .get(URL + "/stats", CONFIG)
      .then((response) => {
        setStats(response.data);
        setIsLoadingStats(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setStats(exampleStats);
        setIsLoadingStats(false);
      });
  }, []);

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
              <h3
                style={{
                  color: darkmode ? "black" : "white",
                  paddingTop: isMobile ? "20px" : "",
                }}
              >
                Temporary, Read-Once, Message
              </h3>
              <br />
              <Form.Group className="mb-0" style={{ margin: "0px" }}>
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
                  style={{ backgroundColor: darkmode ? "white" : "lightgray" }}
                  as="textarea"
                  rows={isMobile ? 10 : 16}
                  cols={isMobile ? 36 : 100}
                />
                <Form.Label
                  style={{
                    paddingTop: isMobile ? "20px" : null,
                    color:
                      message.length >= 100
                        ? "red"
                        : darkmode
                        ? "black"
                        : "white",
                  }}
                >
                  {shareId ? null : <p>{message.length} / 120</p>}
                </Form.Label>
              </Form.Group>

              {shareId ? (
                <Share shareId={shareId} />
              ) : (
                <>
                  <div>
                    <Button
                      style={{ marginTop: isMobile ? "20px" : "" }}
                      variant="primary"
                      size="lg"
                      onClick={handleMessage}
                    >
                      Create Burn Message 💌
                    </Button>
                  </div>
                </>
              )}
            </div>
            <hr
              style={{
                marginTop: isMobile ? "20px" : "",
                color: darkmode ? "black" : "white",
                border: "1px solid",
              }}
            />
            {isLoadingStats ? (
              <div
                style={{
                  textAlign: "center",
                  color: darkmode ? "black" : "white",
                }}
              >
                Loading statistics...
              </div>
            ) : (
              <Stats isMobile={isMobile} stats={stats} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
