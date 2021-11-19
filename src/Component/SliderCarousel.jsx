import '../static/styles/SliderCarousel.css'

import Carousel from 'react-bootstrap/Carousel'
import React from 'react';
import PropTypes from 'prop-types'

const SliderCarousel = ({ fetchSlider }) => (
  <Carousel className="carouselContainer shadow">
    {fetchSlider.length > 0 ? (
      fetchSlider.map(({ text, imageURL }) => (
        <Carousel.Item className="carouselItem" key={imageURL}>
          <img className="d-block w-100" alt="" src={imageURL} />
          <Carousel.Caption className="carouselCaption">
            <p>{text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))) : null }
  </Carousel>
)

export default SliderCarousel

SliderCarousel.propTypes = {
  fetchSlider: PropTypes.arrayOf(PropTypes.object).isRequired,
}
