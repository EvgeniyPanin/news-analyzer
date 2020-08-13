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

  pullDataNews = () => {
    return JSON.parse(localStorage.getItem('news'));
  }

  pullSearchWord = () => {
    return JSON.parse(localStorage.getItem('searchWord'));
  }

  pullTotalResults = () => {
    return JSON.parse(localStorage.getItem('totalResults'));
  }
}

export default DataStorage;
