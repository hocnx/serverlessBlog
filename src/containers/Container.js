import React from "react";
import { Row, Col } from "antd";

export default function Container({ children }) {
  return (
    <Row justify="center" align="top" style={containerStyle}>
      <Col flex="900px">{children}</Col>
    </Row>
  );
}

const containerStyle = {
  minHeight: "calc(100vh - 120px)"
};
