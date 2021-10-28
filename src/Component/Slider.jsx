import '../static/styles/Slider.css'

import Carousel from 'react-bootstrap/Carousel'
import React from 'react';

const fetchSlider = [
    {
        imageURL:"https://static2.elcorreo.com/www/pre2017/multimedia/noticias/201703/31/media/cortadas/prueba-01-ketF-U2131796188083t-575x323@El%20Correo.jpg",
        text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
        imageURL:"https://i.blogs.es/a19bfc/testing/450_1000.jpg",
        text: 'lorem impsum oksokko'
    },
    {
        imageURL:"https://www.uba.ar/internacionales/archivos/TEST.jpg",
        text: 'la vie est una chose important'
    }
]

const Slider = () => {
    return (
  <>
  <Carousel className="carouselContainer">
    {fetchSlider.length > 0  ? (
      fetchSlider.map( (slide, i) => {
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

export default Slider
