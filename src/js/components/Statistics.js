class Statistics {
  constructor({localStore, digitsTitle, totalResults, mentionsTitle, createAnaliticsDate}) {
      this._localStore = localStore;
      this._digitsTitle = digitsTitle;
      this._totalResults = totalResults;
      this._mentionsTitle = mentionsTitle;
      this._newsArr = this._localStore.pullDataNews();
      this._createAnaliticsDate = createAnaliticsDate;
      this._analytics = this._createAnalytics(this._newsArr);
      console.log(this._analytics)
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

  // конструирует массив с данными аналитики
  _createAnalytics = (newsArr) => {
    let datesArr =[];

    // наполняем массив датами
    newsArr.forEach(news => {
      datesArr.push(new Date(news.publishedAt))
    });

    // сортируем массив в хронологическом порядке
    datesArr.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }
      return 0;
    })

    // приводим даты в массиве к нужному в разметке виду
    datesArr = datesArr.map(date => {
      return this._createAnaliticsDate(date);
    })

    // преобразуем массив c датами в массив объектов содержащих данные для каждой уникальной даты
    datesArr = datesArr.reduce((acc, date) => {
      if (acc.some(item => item.date === date)) {
        acc.forEach(item => {
          if(item.date === date) {
            item.totalCount = item.totalCount + 1;
          }
        })
        return acc;
      } else {
        return [...acc, {date, totalCount: 1}];
      }
    }, [])

    // Вычислием проценты ширины для каждой диаграммы
    let maximum = 0;
    datesArr.forEach(item => {
      if (item.totalCount > maximum) {
        maximum = item.totalCount;
      }
    })
    datesArr.forEach(item => {
      item.width = `${item.totalCount / maximum * 100}%`
    })
    return datesArr;
  }

  render = ({datesContainer, dateTemplate, chartsContainer, chartTemplate}) => {
    this._analytics.forEach(item => {
      const dateItem = dateTemplate.cloneNode('true');
      dateItem.textContent = item.date;

      datesContainer.appendChild(dateItem);
      const chartItem = chartTemplate.cloneNode('true');
      chartItem.textContent = item.totalCount;
      chartItem.style.width = item.width;
      chartsContainer.appendChild(chartItem);
    })
  }
}

export default Statistics;
