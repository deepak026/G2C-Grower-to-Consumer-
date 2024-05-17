import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { doTokenValidation } from "../../services/users-controller";

function DashboardConsumer() {
  const { email } = useParams(); // Access the id parameter from the URL
  const navigate = useNavigate();

  // Navigate to Grower Profile page
  function handleFindGrower(email){
    navigate("/findGrower/"+email)
  }
  return (
    <div style={{ padding: "20px" }}>
      <h1 className=" mb-4">Welcome, {email}</h1>
      <Row xs={1} md={2} className="g-4 mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Find Grower</Card.Title>
              <Button variant="secondary" onClick={() => handleFindGrower(email)}>
                find grower
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4"></Row>
    </div>
  );
}

export default DashboardConsumer;
