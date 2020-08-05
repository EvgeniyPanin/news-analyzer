import './index.css';
import NewsApi from './js/modules/NewsApi';
import API_KEY from './js/constants/ApiKey';

const newsApiConfig = {
  apiURL: 'https://newsapi.org/v2/everything',
  apiKey: API_KEY,
  pageSize: '100',
}

const newsApi = new NewsApi(newsApiConfig);
newsApi.getNews('Путешествия').then((res) => {console.log(res)});

