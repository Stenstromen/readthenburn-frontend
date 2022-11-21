import React from "react";
import { useState, useEffect, useParams } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MdOutlineDns } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Burn() {
  const { param } = useParams();
  const [message, setMessage] = useState([]);
  const { darkmode } = useDefaultProvider();

  useEffect(() => {
    axios.get(URL + `/${param}`, CONFIG).then((response) => {
      setMessage(response.data)
    });
  }, []);

  return (
    <div>
      <h1>lol</h1>
    </div>
  );
}

export default Burn;
