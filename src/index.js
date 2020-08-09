import "./index.css";
import NewsApi from "./js/modules/NewsApi";
import DataStorage from "./js/modules/DataStorage";
import Preloader from "./js/components/Preloader";
import { NEWS_API_CONFIG } from "./js/constants/NEWS_API_CONFIG";
import { buildCurrentDate } from "./js/utils/buildCurrentDate";
import { buildOneWeekAgoDate } from "./js/utils/buildOneWeekAgoDate";
import { buildNewsCardDate } from "./js/utils/buildNewsCardDate";
import { createNewsCardsArr } from "./js/utils/createNewsCardsArr";
import { ERROR_MESSAGES } from "./js/constants/ERROR_MESSAGES";
import NewsCardList from "./js/components/NewsCardList";
import NewsCard from "./js/components/NewsCard";
import SearchInput from "./js/components/SearchInput";

const preloaderContainer = document.querySelector(".preloader");
const searchLoader = preloaderContainer
  .querySelector(".preloader__circle")
  .closest(".preloader__container");
const notFoundItem = preloaderContainer
  .querySelector(".preloader__logo-not-found")
  .closest(".preloader__container");
const newsSection = document.querySelector(".news");
const cardsContainer = newsSection.querySelector(".news__cards-container");
const paginationButton = newsSection.querySelector(".button_place_news");
const cardTemplate = document.querySelector("#card-template");
const searchForm = document.forms.search;

const preloader = new Preloader(preloaderContainer, searchLoader, notFoundItem);
const localStore = new DataStorage();
const newsApi = new NewsApi(NEWS_API_CONFIG);
const newsList = new NewsCardList(
  newsSection,
  cardsContainer,
  paginationButton
);

function searchNews(word) {
  newsList.clear();
  preloader.toggleNotFoundItem(false);
  preloader.togglePreloader(true);
  preloader.toggleSearchLoader(true);
  newsApi
    .getNews(word, buildCurrentDate(), buildOneWeekAgoDate())
    .then((res) => {
      const newsArr = res.articles;
      localStore.setDataNews(newsArr);
      if (newsArr.length === 0) {
        preloader.toggleSearchLoader(false);
        preloader.toggleNotFoundItem(true);
      } else {
        preloader.togglePreloader(false);
        preloader.toggleSearchLoader(false);
        newsList.toggleNewsSection(true);
        const newsCardsArr = createNewsCardsArr(
          newsArr,
          cardTemplate,
          NewsCard,
          buildNewsCardDate
        );
        newsList.render(newsCardsArr);
      }
    });
}

const search = new SearchInput(searchForm, ERROR_MESSAGES, searchNews);
console.log(search);
