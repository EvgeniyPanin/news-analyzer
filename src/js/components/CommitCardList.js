class CommitCardList {
  constructor(container) {
    this._container = container;
  }

  render = (cardsArr) => {
    let cardsMarkup = '';
    cardsArr.forEach(card => {
      cardsMarkup += card.outerHTML;
    })
    this._container.insertAdjacentHTML("afterbegin", cardsMarkup);
  }
}

export default CommitCardList;
