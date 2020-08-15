import './analytics.css';
import DataStorage from '../../js/modules/DataStorage';
import Statistics from '../../js/components/Statistics';
import {createAnaliticsDate} from '../../js/utils/createAnaliticsDate';
import {createMonth} from '../../js/utils/createMonth';

const digitsTitle = document.querySelector('.digits__title');
const totalResults = document.querySelector('.digits__week-digit');
const mentionsTitle = document.querySelector('.digits__title-digit');
const datesContainer = document.querySelector('#dates');
const chartsContainer = document.querySelector('#diagrams');
const dateTemplate = document.querySelector('#date-template').content.querySelector('p');
const chartTemplate = document.querySelector('#diagram-template').content.querySelector('p');
const chartDigitsTopContainer = document.querySelector('.analytics__number-container_place_top');
const chartDigitsBottomContainer = document.querySelector('.analytics__number-container_place_bottom');
const analyticsNumberTemplate = document.querySelector('#analytics-number').content.querySelector('p');
const dateContainerTitle = document.querySelector('.analytics__column-title');

const localStore = new DataStorage();
const statistics = new Statistics({
  localStore,
  digitsTitle,
  totalResults,
  mentionsTitle,
  createAnaliticsDate,
  createMonth});

statistics.setDigitsTitle();
statistics.setTotalResults();
statistics.setMentionsTitle();

// рендерим аналитические графики на страницу
statistics.getAnalytics().forEach(item => {
  const dateItem = dateTemplate.cloneNode('true');
  dateItem.textContent = item.date;
  datesContainer.appendChild(dateItem);

  const chartItem = chartTemplate.cloneNode('true');
  if (item.totalCount !== 0) {
    chartItem.textContent = item.totalCount
  };
  chartItem.style.width = item.width;
  chartsContainer.appendChild(chartItem);
})

// рендерим числовые ориентиры диаграмм
let markupString = '';
const maxLevel = statistics.getMaxLevel();
for (let i=0; i <= 4; i++) {
  switch (i) {
    case 0:
      analyticsNumberTemplate.textContent = '0';
      markupString += analyticsNumberTemplate.outerHTML;
      break;
    case 1:
      analyticsNumberTemplate.textContent = `${Math.round(maxLevel * 0.25)}`;
      markupString += analyticsNumberTemplate.outerHTML;
      break;
    case 2:
      analyticsNumberTemplate.textContent = `${Math.round(maxLevel * 0.5)}`;
      markupString += analyticsNumberTemplate.outerHTML;
      break;
    case 3:
      analyticsNumberTemplate.textContent = `${Math.round(maxLevel * 0.75)}`;
      markupString += analyticsNumberTemplate.outerHTML;
      break;
    case 4:
      analyticsNumberTemplate.textContent = `${maxLevel}`;
      markupString += analyticsNumberTemplate.outerHTML;
      break;
  }
}
chartDigitsTopContainer.insertAdjacentHTML("afterbegin", markupString);
chartDigitsBottomContainer.insertAdjacentHTML("afterbegin", markupString);

// рендерим месяцы охвата в заголовок таблицы
dateContainerTitle.textContent = `Дата (${statistics.getMonths().join(', ')})`;

