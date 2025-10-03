import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiWindows,
  SiPowerbi,
} from "react-icons/si";

function Toolstack() {
  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}></h2>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <SiWindows size={50} />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiVisualstudiocode size={50} />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPostman size={50} />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiVercel size={50} />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPowerbi size={50} />
        </Col>
      </Row>
    </>
  );
}

export default Toolstack;

