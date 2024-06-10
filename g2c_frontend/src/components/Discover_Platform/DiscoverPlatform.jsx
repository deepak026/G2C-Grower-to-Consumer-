import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import Card from "react-bootstrap/Card";
import "./DiscoverPlatformStyle.css";
function DiscoverPlatform() {
  return (
    <div className="services_container">
      <h1 className="services_title">Discover Our Platform</h1>

      <div>
         {/* Card 1 */}
        <div className="row service_cards">
          <div className="col-md-6">
            <Card >
               <Card.Img className="service_card_img" variant="top" src="https://assets.lummi.ai/assets/QmSLLyVY4S5ZnyURDdu2RhfzCWCNUzBGXYcpNpJh51xhzq?auto=format&w=1500.jpg" />
            </Card>
          </div>
          <div className="col-md-6 service_info">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              vel sequi tempora dolorem quia quam blanditiis, ut perspiciatis
              eveniet placeat amet, quaerat quibusdam culpa inventore dolores
              numquam cum animi delectus.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="row service_cards">
          <div className="col-md-6 service_info">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              vel sequi tempora dolorem quia quam blanditiis, ut perspiciatis
              eveniet placeat amet, quaerat quibusdam culpa inventore dolores
              numquam cum animi delectus.
            </p>
          </div>
          <div className="col-md-6">
            <Card className="service_card">
               <Card.Img variant="top" src="https://assets.lummi.ai/assets/QmSLLyVY4S5ZnyURDdu2RhfzCWCNUzBGXYcpNpJh51xhzq?auto=format&w=1500.jpg" />
            </Card>
          </div>
        </div>
        {/* Card 3 */}
        <div className="row service_cards">
          <div className="col-md-6">
            <Card className="service_card">
               <Card.Img variant="top" src="https://assets.lummi.ai/assets/QmSLLyVY4S5ZnyURDdu2RhfzCWCNUzBGXYcpNpJh51xhzq?auto=format&w=1500.jpg" />
            </Card>
          </div>
          <div className="col-md-6 service_info">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              vel sequi tempora dolorem quia quam blanditiis, ut perspiciatis
              eveniet placeat amet, quaerat quibusdam culpa inventore dolores
              numquam cum animi delectus.
            </p>
          </div>
        </div>
      </div>
          </div>
  );
}

export default DiscoverPlatform;
