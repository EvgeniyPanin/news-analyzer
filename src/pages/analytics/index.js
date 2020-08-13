import './analytics.css';
import DataStorage from '../../js/modules/DataStorage';

const digitsTitle = document.querySelector('.digits__title');
const totalResults = document.querySelector('.digits__week-digit');
const mentionsTitle = document.querySelector('.digits__title-digit');
const localStore = new DataStorage();
const searchWord = localStore.pullSearchWord();
const countMentionsTitle = localStore.pullDataNews().reduce((acc, news) => {
  const title = news.title;
  if (title.includes(searchWord)) {
    return ++acc;
  }
  return acc;
}, 0);

digitsTitle.textContent = `Вы спросили: «${searchWord}»`;
totalResults.textContent = localStore.pullTotalResults();
mentionsTitle.textContent = countMentionsTitle;
