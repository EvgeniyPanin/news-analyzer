class Statistics {
  constructor({localStore, digitsTitle, totalResults, mentionsTitle, createAnaliticsDate, createMonth}) {
      this._localStore = localStore;
      this._digitsTitle = digitsTitle;
      this._totalResults = totalResults;
      this._mentionsTitle = mentionsTitle;
      this._maxLevel = null;
      this._months = [];
      this._newsArr = this._localStore.pullDataNews();
      this._createMonth = createMonth;
      this._createAnaliticsDate = createAnaliticsDate;
      this._analytics = this._createAnalytics(this._newsArr);
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

  _createAccumArray = () => {
    const currentDate = new Date(this._localStore.pullCurrentDate());
    const arr = [];
    for (let i=6; i >= 0; i--) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() - i)
      arr.push({date: this._createAnaliticsDate(date), totalCount: 0})
    }
    return arr;
  }

  // конструирует массив с данными аналитики
  _createAnalytics = (newsArr) => {
    let datesArr =[];

    // наполняем массив дат новостей и массив месяцев, которые захватила выборка
    newsArr.forEach(news => {
      const month = this._createMonth(news.publishedAt);
      if (!this._months.includes(month)) {
        this._months.push(month)
      }

      datesArr.push(this._createAnaliticsDate(new Date(news.publishedAt)))
    });

    // собираем массив с объектами дат, который послужит основой редюсера
    const accumArray =  this._createAccumArray();

    // редюсим в шаблонный массив данные по статистике за каждую дату
    datesArr = datesArr.reduce((acc, date) => {
      if (acc.some(item => item.date === date)) {
        acc.forEach(item => {
          if(item.date === date) {
            item.totalCount = item.totalCount + 1;
          }
        })
        return acc;
      }
    }, accumArray)

    // Вычисляем проценты ширины для каждой диаграммы
    datesArr.forEach(item => {
      if (item.totalCount > this._maxLevel) {
        this._maxLevel = item.totalCount;
      }
    })
    datesArr.forEach(item => {
      item.width = `${item.totalCount / this._maxLevel * 100}%`
    })
    return datesArr;
  }

  getAnalytics = () => {
    return this._analytics;
  }

  getMaxLevel = () => {
    return this._maxLevel;
  }

  getMonths = () => {
    return this._months;
  }
}

export default Statistics;
