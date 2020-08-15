class NewsCard {
  constructor(card, newsData, buildNewsCardDate) {
    this._card = card;
    this._cardLink = card.querySelector('.news-card');
    this._photo = card.querySelector('.news-card__photo');
    this._date = card.querySelector('.news-card__date');
    this._title = card.querySelector('.news-card__title');
    this._paragraph = card.querySelector('.news-card__paragraph');
    this._label = card.querySelector('.news-card__label');
    this._buildNewsCardDate = buildNewsCardDate;
    this._newsData = newsData;
  }

  create = () => {
    if (this._newsData.urlToImage) {
      this._photo.src = this._newsData.urlToImage;
    }
    this._date.textContent = this._buildNewsCardDate(this._newsData.publishedAt);
    this._cardLink.href = this._newsData.url;
    this._title.textContent = this._newsData.titlestr;
    this._paragraph.textContent = this._newsData.description;
    this._label.textContent = this._newsData.source.name;

    return this._card;
  }
}

export default NewsCard;
