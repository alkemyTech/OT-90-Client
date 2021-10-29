import React from 'react';
import SliderCarousel from './SliderCarousel';

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
  <SliderCarousel fetchSlider={fetchSlider}/>
  </>
)
}

export default Slider
