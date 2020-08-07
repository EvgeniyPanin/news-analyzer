import './index.css';
import NewsApi from './js/modules/NewsApi';
import DataStorage from './js/modules/DataStorage';
import Preloader from './js/components/Preloader';
import {newsApiConfig} from './js/constants/newsApiConfig';
import {buildCurrentDate} from './js/utils/buildCurrentDate';
import {buildOneWeekAgoDate} from './js/utils/buildOneWeekAgoDate';

const preloaderContainer = document.querySelector('.preloader');
const searchLoader = preloaderContainer.querySelector('.preloader__circle').closest('.preloader__container');
const notFoundItem = preloaderContainer.querySelector('.preloader__logo-not-found').closest('.preloader__container');

const preloader = new Preloader(preloaderContainer, searchLoader, notFoundItem);
const store = new DataStorage;

preloader.togglePreloader(true);
preloader.toggleSearchLoader(true);
const newsApi = new NewsApi(newsApiConfig);
newsApi.getNews('Беларусь', buildCurrentDate(), buildOneWeekAgoDate())
  .then((res) => {
    store.setDataNews(res.articles);
    if (res.articles.length === 0) {
      preloader.toggleSearchLoader(false);
      preloader.toggleNotFoundItem(true);
    } else {
      preloader.togglePreloader(false);
      preloader.toggleSearchLoader(false);
    }

  });

