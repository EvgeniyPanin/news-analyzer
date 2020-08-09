class NewsCardList {
  constructor(newsSection, cardsContainer, paginationButton) {
    this._newsSection = newsSection;
    this._cardsContainer = cardsContainer;
    this._paginationButton = paginationButton;
  }

  toggleNewsSection = (state) => {
    state ?
      this._newsSection.classList.add('news_active') :
      this._newsSection.classList.remove('news_active');
  }

  render = (cards) => {
    cards.forEach(card => {
      this._cardsContainer.appendChild(card);
    })
  }

  clear = () => {
    this._cardsContainer.innerHTML = '';
  }
}

export default NewsCardList;
