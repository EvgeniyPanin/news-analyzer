class NewsApi {
  constructor(config) {
    this.apiURL = config.apiURL;
    this.apiKey = config.apiKey;
    this.country = config.country;
    this.pageSize = config.pageSize;
  }

  getNews = (word) => {
    const currentDate = this._buildCurrentDate();
    const oneWeekAgoDate = this._buildOneWeekAgoDate();
    return fetch(`${this.apiURL}?q=${word}&to=${currentDate}&from=${oneWeekAgoDate}&pageSize=${this.pageSize}`, {
      method: 'GET',
      headers: {
        authorization: this.apiKey,
      }
    }).then((res) => res.json())
  }

  _buildCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${'0' + (date.getMonth() + 1)}-${'0' + date.getDate()}`;
  }

  _buildOneWeekAgoDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const year = date.getFullYear();
    const month = ((date.getMonth() + 1 + '').length === 1) ? '0' + ((date.getMonth() + 1)) : (date.getMonth() + 1)
    return `${year}-${month}-${date.getDate().length === 1 ? '0' + date.getDate() : date.getDate()}`
  }
}

export default NewsApi;
