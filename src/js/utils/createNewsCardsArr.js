export const createNewsCardsArr = (newsArr, cardTemplate, NewsCard) => {
  return newsArr.map(news => {
    const card = cardTemplate.cloneNode('true').content.querySelector('li');
    return new NewsCard(card, news).create();
  })
}
