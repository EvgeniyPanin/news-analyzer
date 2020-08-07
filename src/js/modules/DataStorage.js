class DataStorage {
  constructor() {

  }

  setDataNews = (data) => {
    localStorage.setItem('news', JSON.stringify(data))
  }
}

export default DataStorage
