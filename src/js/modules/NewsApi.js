

class NewsApi {
  constructor(config) {
    this._apiURL = config.apiURL;
    this._apiKey = config.apiKey;
    this._pageSize = config.pageSize;
  }

  getNews = (word, currentDate, oneWeekAgoDate) => {
    return fetch(`${this._apiURL}?q=${word}&to=${currentDate}&from=${oneWeekAgoDate}&pageSize=${this._pageSize}&apiKey=${this._apiKey}`, {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json()
      };
      return Promise.reject(new Error(`Ошибка ${res.status}`));
    })
  }
}

export default NewsApi;
