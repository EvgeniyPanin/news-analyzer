export const createNewsCardsArr = (newsArr, cardTemplate, NewsCard, buildNewsCardDate) => {
  return newsArr.map(news => {
    const card = cardTemplate.cloneNode('true').content.querySelector('li');
    return new NewsCard(card, news, buildNewsCardDate).create();
  })
}
