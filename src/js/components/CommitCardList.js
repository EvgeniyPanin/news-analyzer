class CommitCardList {
  constructor(container) {
    this._container = container;
  }

  render = (cardsArr) => {
    cardsArr.forEach(card => {
      this._container.appendChild(card);
    })
  }
}

export default CommitCardList;
