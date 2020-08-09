export const createNewsCardsArr = (newsArr, cardTemplate, NewsCard, buildNewsCardDate) => {
  return newsArr.map(news => {
    const card = cardTemplate.cloneNode('true').content.querySelector('li');
    const date = new Date(news.publishedAt);
    console.log(date.getFullYear())
    return new NewsCard(card, news, buildNewsCardDate).create();
  })
}
