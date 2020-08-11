class CommitCard {
  constructor(card, commitData, buildCardDate) {
    this._card = card;
    this._avatar = card.querySelector('.commit-card__user-avatar');
    this._name = card.querySelector('.commit-card__user-name');
    this._email = card.querySelector('.commit-card__user-mail');
    this._date = card.querySelector('.commit-card__date');
    this._cardLink = card.querySelector('.commit-card');
    this._message = card.querySelector('.commit-card__paragraph');
    this.buildNewsCardDate = buildCardDate;
    this._commitData = commitData;
  }

  create = () => {
    this._avatar.src = this._commitData.author.avatar_url;
    this._name.textContent = this._commitData.commit.committer.name;
    this._date.textContent = this.buildNewsCardDate(this._commitData.commit.committer.date);
    this._cardLink.href = this._commitData.committer.html_url;
    this._email.textContent = this._commitData.commit.committer.email;
    this._message.textContent = this._commitData.commit.message;

    return this._card;
  }
}

export default CommitCard;
