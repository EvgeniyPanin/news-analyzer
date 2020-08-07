import './index.css';
import NewsApi from './js/modules/NewsApi';
import DataStorage from './js/modules/DataStorage';
import API_KEY from './js/constants/ApiKey';

const store = new DataStorage;

const newsApiConfig = {
  apiURL: 'https://newsapi.org/v2/everything',
  apiKey: API_KEY,
  pageSize: '100',
}

const newsApi = new NewsApi(newsApiConfig);
newsApi.getNews('Крым').then((res) => {store.setDataNews(res.articles)});

