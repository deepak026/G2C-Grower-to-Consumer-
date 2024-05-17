import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./ImgCarouselStyle.css";
function ImgCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className='imgCoro' activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="c">
        <img
          className="d-block w-100"
          src="/images/Home_page_carousel/img1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImgCarousel;
