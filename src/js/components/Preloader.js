class Preloader {
  constructor(container, searchLoader, notFoundItem) {
    this._container = container;
    this._searchLoader = searchLoader;
    this._notFoundItem = notFoundItem;
  }

  togglePreloader = (state) => {
    state ?
      this._container.classList.add('preloader_active') :
      this._container.classList.remove('preloader_active');
  }

  toggleSearchLoader = (state) => {
    state ?
      this._searchLoader.classList.add('preloader__container_active') :
      this._searchLoader.classList.remove('preloader__container_active');
  }

  toggleNotFoundItem = (state) => {
    state ?
      this._notFoundItem.classList.add('preloader__container_active') :
      this._notFoundItem.classList.remove('preloader__container_active');
  }
}

export default Preloader;
