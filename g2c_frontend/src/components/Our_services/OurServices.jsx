import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Card from 'react-bootstrap/Card';
import "./OurServicesStyle.css";
function OurServices() {
  return (
    <div className="services_container">
      <div className="services_title">
         <h1>Our Services</h1>
      </div>

       <div className="service_cards">
          <div className="row">
             <div className="col-md-6">
                <Card style={{ width: '18rem' }} className='sCard'>
                  <Card.Img className="services-img" variant="top" height="50px" width="50px" src="https://assets.lummi.ai/assets/QmSLLyVY4S5ZnyURDdu2RhfzCWCNUzBGXYcpNpJh51xhzq?auto=format&w=1500.jpg" alt="Card image" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
             </div>
             <div className="col-md-6 service_info">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat vel sequi tempora dolorem quia quam blanditiis, ut perspiciatis eveniet placeat amet, quaerat quibusdam culpa inventore dolores numquam cum animi delectus.</p>
             </div>
          </div>
       </div>
       <div className="service_cards">
          <div className="row">
             <div className="col-md-6 service_info">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat vel sequi tempora dolorem quia quam blanditiis, ut perspiciatis eveniet placeat amet, quaerat quibusdam culpa inventore dolores numquam cum animi delectus.</p>
             </div>
             <div className="col-md-6">
                <Card style={{ width: '18rem' }} className='sCard'>
                  <Card.Img className="services-img" variant="top" height="50px" width="50px" src="https://assets.lummi.ai/assets/QmSLLyVY4S5ZnyURDdu2RhfzCWCNUzBGXYcpNpJh51xhzq?auto=format&w=1500.jpg" alt="Card image" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
             </div>
          </div>
       </div>
       <div className="service_cards">
          <div className="row">
             <div className="col-md-6">
                <Card style={{ width: '18rem' }} className='sCard'>
                  <Card.Img className="services-img" variant="top" height="50px" width="50px" src="https://assets.lummi.ai/assets/QmSLLyVY4S5ZnyURDdu2RhfzCWCNUzBGXYcpNpJh51xhzq?auto=format&w=1500.jpg" alt="Card image" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
             </div>
             <div className="col-md-6 service_info">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat vel sequi tempora dolorem quia quam blanditiis, ut perspiciatis eveniet placeat amet, quaerat quibusdam culpa inventore dolores numquam cum animi delectus.</p>
             </div>
          </div>
       </div>
    </div>
  );
}

export default OurServices;
