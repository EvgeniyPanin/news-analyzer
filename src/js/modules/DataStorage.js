class DataStorage {
  constructor() {

  }

  setDataNews = (data) => {
    localStorage.setItem('news', JSON.stringify(data));
  }

  setSearchWord = (word) => {
    localStorage.setItem('searchWord', JSON.stringify(word));
  }

  pullDataNews = () => {
    return JSON.parse(localStorage.getItem('news'));
  }

  pullSearchWord = () => {
    return JSON.parse(localStorage.getItem('searchWord'));
  }
}

export default DataStorage
