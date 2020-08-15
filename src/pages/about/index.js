import './about.css';
import Swiper from 'swiper/bundle';
import CommitCard from '../../js/components/CommitCard';
import CommitCardList from '../../js/components/CommitCardList';
import GithubApi from '../../js/modules/GithubApi';
import { SWIPER_CONFIG } from '../../js/constants/SWIPER_CONFIG';
import { GITHUB_API_CONFIG } from '../../js/constants/GITHUB_API_CONFIG';
import { buildCardDate } from '../../js/utils/buildCardDate';
import { createCommitCardsArr } from '../../js/utils/createCommitCardsArr';
import { FAILED_LOAD_MESSAGES } from '../../js/constants/FAILED_LOAD_MESSAGES';


const cardTemplate = document.querySelector('#commit-card');
const commitsContainer = document.querySelector('.commits__container');
const failedLoadContainer = document.querySelector('.commits__failed-container');
const errorItem = failedLoadContainer.querySelector('#error-item');
const errorHeader = failedLoadContainer.querySelector('#error-header');

const commitsList = new CommitCardList(commitsContainer);
const githubApi = new GithubApi(GITHUB_API_CONFIG);

githubApi.getCommits()
  .then(res => {
    const commitCardsArr = createCommitCardsArr(res, cardTemplate, CommitCard, buildCardDate);
    commitsList.render(commitCardsArr);
    const mySwiper = new Swiper('.commits__slider-container', SWIPER_CONFIG);
  })
  .catch(err => {
    failedLoadContainer.classList.add('commits__failed-container_active');
    errorHeader.textContent = FAILED_LOAD_MESSAGES.commits;
    errorItem.textContent = err.message;
  })
