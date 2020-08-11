import Swiper from 'swiper/bundle';
// import 'swiper/swiper-bundle.css';
import './about.css';

const mySwiper = new Swiper('.commits__slider-container', {
  direction: 'horizontal',
  loop: false,
  pagination: {
    el: '.commits__dots-container',
    clickable: true,
    bulletClass: 'commits__dot',
    bulletActiveClass: 'commits__dot_active',
  },
  navigation: {
    nextEl: '.commits__slider-button_place_right',
    prevEl: '.commits__slider-button_place_left',
  },
  breakpoints: {
    680: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    1250: {
      slidesPerView: 3,
      spaceBetween: 16
    },
  },
  slidesPerView: 1,
  spaceBetween: 8,
  slideClass: 'commits__item',
  wrapperClass: 'commits__container',
})
