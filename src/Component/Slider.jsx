import React from 'react';
import SliderCarousel from './SliderCarousel';

const fetchSlider = [
  {
    imageURL: 'images/manos10.jpg',
    text: 'Somos mas',
  },
  {
    imageURL: 'images/foto10.jpg',
    text: 'Somos mas',
  },
  {
    imageURL: 'images/foto11.jpg',
    text: 'Somos mas',
  },
]

const Slider = () => <SliderCarousel fetchSlider={fetchSlider} />

export default Slider
