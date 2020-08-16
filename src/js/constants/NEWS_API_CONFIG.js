const url = NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything' : 'https://nomoreparties.co/news/v2/everything';
export const NEWS_API_CONFIG = {
  apiURL: url,
  apiKey: 'd55b1fd0021e412ba0db91f165f8912a',
  pageSize: '100',
}
