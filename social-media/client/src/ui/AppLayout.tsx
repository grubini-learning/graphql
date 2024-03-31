import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export const AppLayout = () => {
  return (
    <Container fluid>
      <Row
        style={{
          height: "45px",
          padding: "12px 0",
          borderBottom: "1px solid grey",
          marginBottom: "24px",
        }}
      >
        <header>Post Nook</header>
      </Row>
      <Row className="justify-content-center">
        <Col xs="6">
          <main>
            <Outlet />
          </main>
        </Col>
      </Row>
    </Container>
  );
};
