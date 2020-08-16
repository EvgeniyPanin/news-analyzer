import "./index.css";
import NewsApi from "./js/modules/NewsApi";
import DataStorage from "./js/modules/DataStorage";
import Preloader from "./js/components/Preloader";
import NewsCardList from "./js/components/NewsCardList";
import NewsCard from "./js/components/NewsCard";
import SearchInput from "./js/components/SearchInput";
import { NEWS_API_CONFIG } from "./js/constants/NEWS_API_CONFIG";
import { buildCurrentDate } from "./js/utils/buildCurrentDate";
import { buildOneWeekAgoDate } from "./js/utils/buildOneWeekAgoDate";
import { buildCardDate } from "./js/utils/buildCardDate";
import { createNewsCardsArr } from "./js/utils/createNewsCardsArr";
import { ERROR_MESSAGES } from "./js/constants/ERROR_MESSAGES";
import { FAILED_LOAD_MESSAGES } from './js/constants/FAILED_LOAD_MESSAGES';

const preloaderContainer = document.querySelector(".preloader");
const searchLoader = preloaderContainer
  .querySelector(".preloader__circle")
  .closest(".preloader__container");
const notFoundItem = preloaderContainer
  .querySelector(".preloader__logo-not-found")
  .closest(".preloader__container");
const failedLoadItem = preloaderContainer
  .querySelector(".preloader__logo-failed-load")
  .closest(".preloader__container");
const loadErrorContainer = failedLoadItem.querySelector(".preloader__description");
const newsSection = document.querySelector(".news");
const cardsContainer = newsSection.querySelector(".news__cards-container");
const paginationButton = newsSection.querySelector(".button_place_news");
const cardTemplate = document.querySelector("#card-template");
const searchForm = document.forms.search;
const currentDate = buildCurrentDate();
const oneWeekAgoDate = buildOneWeekAgoDate();

const preloader = new Preloader(preloaderContainer, searchLoader, notFoundItem, failedLoadItem);
const localStore = new DataStorage();
const newsApi = new NewsApi(NEWS_API_CONFIG);
const newsList = new NewsCardList(
  newsSection,
  cardsContainer,
  paginationButton
);

// функция выполняется при сабмите формы поиска,
// описывает логику отображения прелоудера и отрисовывает первые 3 карточки
function searchNews(word) {
  newsList.clear();
  newsList.toggleNewsSection(false);
  newsList.togglePaginationButton(true);
  preloader.toggleNotFoundItem(false);
  preloader.togglePreloader(true);
  preloader.toggleSearchLoader(true);
  preloader.toggleFailedLoadItem(false);
  search.setSubmitButtonState(false);
  newsApi
    .getNews(word, currentDate, oneWeekAgoDate)
    .then((res) => {
      const newsArr = res.articles;
      search.setSubmitButtonState(true);
      if (newsArr.length === 0) {
        preloader.toggleSearchLoader(false);
        preloader.toggleNotFoundItem(true);
        localStore.clear();
      } else {
        localStore.setDataNews(newsArr);
        localStore.setSearchWord(word);
        localStore.setTotalResults(res.totalResults);
        localStore.setCurrentDate(currentDate);
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
    })
    .catch(err => {
      preloader.toggleSearchLoader(false);
      preloader.toggleFailedLoadItem('true');
      preloader.renderErrorLoad(`${FAILED_LOAD_MESSAGES.news}
        ${err.message}`, loadErrorContainer);
      search.setSubmitButtonState(true);
    })
}

const search = new SearchInput(searchForm, ERROR_MESSAGES, searchNews);

// если данные в локальном хранилище не совпадают с текущей датой, очищаем их
if (currentDate !== localStore.pullCurrentDate()) {
  localStore.clear()
}

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
