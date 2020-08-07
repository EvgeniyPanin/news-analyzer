class DataStorage {
  constructor() {

  }

  setDataNews = (data) => {
    localStorage.setItem('news', JSON.stringify(data));
  }

  pullDataNews = () => {
    return JSON.parse(localStorage.getItem('news'));
  }
}

export default DataStorage
