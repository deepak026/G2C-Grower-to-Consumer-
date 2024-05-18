import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {doTokenValidation} from "../../services/users-controller"


function DashboardGrower() {
    const { email } = useParams(); // Access the id parameter from the URL
    const navigate = useNavigate();

    // Navigate to Grower Profile page
    function openprofile(email) {
        navigate("/growerProfile/" + email);
    }

    // Navigate to List Products page
    function openListedProducts(email) {
        navigate("/listProducts/"+email);
    }

    // Navigate to View Products page
    function openManageProducts(email) {
        navigate("/manageProducts/" + email);
    }

   async function handleToken(){
        const serverData = await doTokenValidation();
        alert(JSON.stringify(serverData.data));
    }
    return (
        <div style={{ padding: '20px' }}>
            <h1 className=" mb-4">Welcome, {email}</h1>
            <Row xs={1} md={2}  className="g-4 mb-4">
                <Col>
                    <Card >
                        <Card.Body>
                            <Card.Title>Grower Profile</Card.Title>
                            <Button variant="secondary" onClick={() => openprofile(email)}>View Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card >
                        <Card.Body>
                            <Card.Title>List New Products</Card.Title>
                            <Button variant="secondary" onClick={() => openListedProducts(email)}>Add Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row xs={1} md={2}  className="g-4">
                <Col>
                    <Card >
                        <Card.Body>
                            <Card.Title>Manage Products</Card.Title>
                            <Button variant="secondary" onClick={() => openManageProducts(email)}>View Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '100%', height: '100%' }}>
                        <Card.Body>
                            <Card.Title>Ratings</Card.Title>
                            <Button variant="secondary">View Ratings</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            {/* <Card style={{ width: '100%', height: '100%' }}>
                        <Card.Body>
                            <Card.Title>Check Token</Card.Title>
                            <Button variant="primary" onClick={handleToken}>Verify token</Button>
                        </Card.Body>
                    </Card> */}
        </div>
    );
}

export default DashboardGrower;
