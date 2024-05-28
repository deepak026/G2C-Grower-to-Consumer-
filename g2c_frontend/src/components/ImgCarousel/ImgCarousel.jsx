import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./ImgCarouselStyle.css";
import { Col, Row } from "react-bootstrap";
function ImgCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Row>
        <Col lg={6} md={12} className="imgCoroText mb-4 order-md-1">
          <h2 className="imgCoroTitle">Welcome,</h2>
          <p>
            Uncover the pleasure of backing <i>local farmers</i> and relishing the peak
            of freshness and flavor. Engage with the diverse fabric of
            agricultural communities and savor the genuine farm-to-table
            experience. Dive into <i>sustainable</i> farming, community upliftment, and
            delightful culinary experiences. Become part of our platform and
            immerse yourself in the richness of farm-fresh produce!
          </p>
        </Col>
        <Col className="mb-4 order-md-2">
          <Carousel
            className="imgCoro"
            activeIndex={index}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/Home_page_carousel/img1.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="c">
              <img
                className="d-block w-100"
                src="/images/Home_page_carousel/img2.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="c">
              <img
                className="d-block w-100"
                src="/images/Home_page_carousel/img3.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <hr className="hrImgCoro"/>
    </>
  );
}

export default ImgCarousel;
