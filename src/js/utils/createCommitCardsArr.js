export const createCommitCardsArr = (commitsData, cardTemplate, CommitCard, buildCardDate) => {
  return commitsData.map(commit => {
    const card = cardTemplate.cloneNode('true').content.querySelector('li');
    return new CommitCard(card, commit, buildCardDate).create();
  })
}
