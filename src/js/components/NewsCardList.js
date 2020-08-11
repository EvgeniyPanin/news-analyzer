class NewsCardList {
  constructor(newsSection, cardsContainer, paginationButton) {
    this._newsSection = newsSection;
    this._cardsContainer = cardsContainer;
    this._paginationButton = paginationButton;
    this._fullCards = null;
    this._setHandlers();
  }

  setFullCardsArr = (fullCardsArr) => {
    this._fullCards = fullCardsArr;
  }

  getFullCardsArr = () => {
    return this._fullCards;
  }

  toggleNewsSection = (state) => {
    state ?
      this._newsSection.classList.add('news_active') :
      this._newsSection.classList.remove('news_active');
  }

  pagination = () => {
    const renderCards = [];
    for (let i = 0; i<3; i++) {
      renderCards.push(this._fullCards.pop())
    }
    this._render(renderCards);
    if (this._fullCards.length === 0) {
      this.togglePaginationButton(false);
    }
  }

  initRender = (newsCardsArr) => {
    this.toggleNewsSection(true);
    this.setFullCardsArr(newsCardsArr);
    this.pagination();
  }

  _render = (cards) => {
    console.log(cards)
    cards.forEach(card => {
      if (card) {
        this._cardsContainer.appendChild(card);
      }

    })
  }

  clear = () => {
    this._cardsContainer.innerHTML = '';
  }

  _setHandlers = () => {
    this._paginationButton.addEventListener('click', this.pagination);
  }

  togglePaginationButton = (state) => {
    state ?
      this._paginationButton.classList.add('button_show') :
      this._paginationButton.classList.remove('button_show');
  }
}

export default NewsCardList;
