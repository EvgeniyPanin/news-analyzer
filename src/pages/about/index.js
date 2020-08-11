import Swiper from 'swiper/bundle';
// import 'swiper/swiper-bundle.css';
import './about.css';
import CommitCard from '../../js/components/CommitCard';
import CommitCardList from '../../js/components/CommitCardList';
import GithubApi from '../../js/modules/GithubApi';
import {GITHUB_API_CONFIG} from '../../js/constants/GITHUB_API_CONFIG';
import { buildCardDate } from "../../js/utils/buildCardDate";
import { createCommitCardsArr } from "../../js/utils/createCommitCardsArr";


const cardTemplate = document.querySelector('#commit-card');
const commitsContainer = document.querySelector('.commits__container');

const commitsList = new CommitCardList(commitsContainer);
const githubApi = new GithubApi(GITHUB_API_CONFIG);

githubApi.getCommits()
  .then(res => {
    const commitCardsArr = createCommitCardsArr(res, cardTemplate, CommitCard, buildCardDate);
    commitsList.render(commitCardsArr);
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
  });
