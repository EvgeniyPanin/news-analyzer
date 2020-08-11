import "./index.css";
import NewsApi from "./js/modules/NewsApi";
import DataStorage from "./js/modules/DataStorage";
import Preloader from "./js/components/Preloader";
import { NEWS_API_CONFIG } from "./js/constants/NEWS_API_CONFIG";
import { buildCurrentDate } from "./js/utils/buildCurrentDate";
import { buildOneWeekAgoDate } from "./js/utils/buildOneWeekAgoDate";
import { buildCardDate } from "./js/utils/buildCardDate";
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

// функция, описывающая логику поиска, прелоудера и отрисовывающая первые 3 карточки
function searchNews(word) {
  newsList.clear();
  newsList.toggleNewsSection(false);
  newsList.togglePaginationButton(true);
  preloader.toggleNotFoundItem(false);
  preloader.togglePreloader(true);
  preloader.toggleSearchLoader(true);
  search.setSubmitButtonState(false);
  newsApi
    .getNews(word, buildCurrentDate(), buildOneWeekAgoDate())
    .then((res) => {
      const newsArr = res.articles;
      search.setSubmitButtonState(true);
      localStore.setDataNews(newsArr);
      localStore.setSearchWord(word);
      if (newsArr.length === 0) {
        preloader.toggleSearchLoader(false);
        preloader.toggleNotFoundItem(true);
      } else {
        preloader.togglePreloader(false);
        preloader.toggleSearchLoader(false);
        const newsCardsArr = createNewsCardsArr(
          newsArr,
          cardTemplate,
          NewsCard,
          buildCardDate
        );
        newsList.initRender(newsCardsArr);
      }
    });
}

const search = new SearchInput(searchForm, ERROR_MESSAGES, searchNews);

// если в локальном хранилище записаны данные, отрисовываем их на странице
const localCardsDataArr = localStore.pullDataNews();
if (localCardsDataArr) {
  const newsCardsArr = createNewsCardsArr(
    localCardsDataArr,
    cardTemplate,
    NewsCard,
    buildCardDate
  );
  search.setInputContent(localStore.pullSearchWord());
  search.handlerInputForm();
  newsList.initRender(newsCardsArr);
}
