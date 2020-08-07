class NewsApi {
  constructor(config) {
    this._apiURL = config.apiURL;
    this._apiKey = config.apiKey;
    this._pageSize = config.pageSize;
  }

  getNews = (word, currentDate, oneWeekAgoDate) => {
    return fetch(`${this._apiURL}?q=${word}&to=${currentDate}&from=${oneWeekAgoDate}&pageSize=${this._pageSize}`, {
      method: 'GET',
      headers: {
        authorization: this._apiKey,
      }
    }).then((res) => res.json())
  }
}

export default NewsApi;
