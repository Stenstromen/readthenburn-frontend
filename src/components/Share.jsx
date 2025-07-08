import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BsArrowDownSquareFill } from "react-icons/bs";

function Share(props) {
  const [copyClicked, setCopyClicked] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  useEffect(() => {
    if (copyClicked) {
      simulateNetworkRequest().then(() => {
        setCopyClicked(false);
      });
    }
  }, [copyClicked]);

  useEffect(() => {
    if (shareClicked) {
      simulateNetworkRequest().then(() => {
        setShareClicked(false);
      });
    }
  }, [shareClicked]);

  const handleClick = () => {
    setCopyClicked(true);
    navigator.clipboard.writeText(window.location.href + props.shareId);
  };

  const shareLink = async () => {
    setShareClicked(true);

    const shareData = {
      title: "Burn Link 🔥",
      text: "Read My Temporary Message",
      url: window.location.href + props.shareId,
    };
    await navigator.share(shareData);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card style={{ width: "341px", backgroundColor: "lightgray" }}>
        <Card.Header as="h5">🔥 Link</Card.Header>
        <Card.Body>
          <Card.Text>
            {window.location.href}
            {props.shareId} <BsArrowDownSquareFill />
          </Card.Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Button
              variant="primary"
              disabled={shareClicked}
              onClick={!shareClicked ? shareLink : null}
            >
              {shareClicked ? "Share Link ✅" : "Share Link 📲"}
            </Button>
            <Button
              variant="primary"
              disabled={copyClicked}
              onClick={!copyClicked ? handleClick : null}
            >
              {copyClicked ? "Copy To Clipboard ✅" : "Copy To Clipboard 📎"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Share;

Share.propTypes = {
  shareId: PropTypes.string.isRequired,
};
