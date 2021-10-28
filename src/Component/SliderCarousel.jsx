import '../static/styles/SliderCarousel.css'

import Carousel from 'react-bootstrap/Carousel'
import React from 'react';

const SliderCarousel = (props) => {
    return (
  <>
  <Carousel className="carouselContainer">
    {props.fetchSlider.length > 0  ? (
      props.fetchSlider.map( (slide, i) => {
        return  <Carousel.Item key={i}>
            <img
                    className="d-block w-100"
                    src={slide.imageURL} 
            />
          <Carousel.Caption className="carouselCaption">
            <p>{slide.text}</p>
          </Carousel.Caption>
        </Carousel.Item>                    
                }) ) : null } 
  </Carousel>
  </>
    )
}

export default SliderCarousel
