class Statistics {
  constructor({localStore, digitsTitle, totalResults, mentionsTitle}) {
    this.weekDays = [
      'вс',
      'пн',
      'вт',
      'ср',
      'чт',
      'пт',
      'сб',
    ];
      this._localStore = localStore;
      this._digitsTitle = digitsTitle;
      this._totalResults = totalResults;
      this._mentionsTitle = mentionsTitle;
      console.log(this._createDateArr(this._localStore.pullDataNews()));
  }

  setDigitsTitle = () => {
    this._digitsTitle.textContent = `Вы спросили: «${this._localStore.pullSearchWord()}»`;
  }

  setTotalResults = () => {
    this._totalResults.textContent = this._localStore.pullTotalResults();
  }

  setMentionsTitle = () => {
    const newsArr = this._localStore.pullDataNews();
    const searchWord = this._localStore.pullSearchWord();
    this._mentionsTitle.textContent = this._countMentionsTitle(newsArr, searchWord);
  }

  _countMentionsTitle = (newsArr, searchWord) => {
    return newsArr.reduce((acc, news) => {
      const title = news.title;
      if (title.includes(searchWord)) {
        return ++acc;
      }
      return acc;
    }, 0);
  }

  _createDateArr = (newsArr) => {
    let datesArr =[];
    newsArr.forEach(news => {
      datesArr.push(new Date(news.publishedAt))
    });
    datesArr.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }
      return 0;
    })
    datesArr = datesArr.map(date => {
      return this.createAnaliticsDate(date);
    })
    datesArr = datesArr.reduce((acc, date) => {
      if (acc[date] || acc[date] === 0) {
        acc[date] = acc[date] + 1;
        return acc;
      } else {
        acc[date] = 0;
        return acc;
      }
    }, {})
    return datesArr;
  }

  createAnaliticsDate = (date) => {
    return `${date.getDate()}, ${this.weekDays[date.getDay()]}`
  }
}

export default Statistics;
