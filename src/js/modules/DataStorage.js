class DataStorage {
  constructor() {

  }

  setDataNews = (data) => {
    localStorage.setItem('news', JSON.stringify(data));
  }

  setSearchWord = (word) => {
    localStorage.setItem('searchWord', JSON.stringify(word));
  }

  setTotalResults = (totalResults) => {
    localStorage.setItem('totalResults', JSON.stringify(totalResults));
  }

  setCurrentDate = (date) => {
    localStorage.setItem('currentDate', JSON.stringify(date));
  }

  pullDataNews = () => {
    return JSON.parse(localStorage.getItem('news'));
  }

  pullSearchWord = () => {
    return JSON.parse(localStorage.getItem('searchWord'));
  }

  pullTotalResults = () => {
    return JSON.parse(localStorage.getItem('totalResults'));
  }

  pullCurrentDate = () => {
    return JSON.parse(localStorage.getItem('currentDate'));
  }

  clear = () => {
    localStorage.clear();
  }
}

export default DataStorage;
