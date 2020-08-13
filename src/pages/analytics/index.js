import './analytics.css';
import DataStorage from '../../js/modules/DataStorage';
import Statistics from '../../js/components/Statistics';
import {DAYS_ARR} from '../../js/constants/DAYS_ARR';
import {createAnaliticsDate} from '../../js/utils/createAnaliticsDate';

const digitsTitle = document.querySelector('.digits__title');
const totalResults = document.querySelector('.digits__week-digit');
const mentionsTitle = document.querySelector('.digits__title-digit');
const datesContainer = document.querySelector('#dates');
const chartsContainer = document.querySelector('#diagrams');
const dateTemplate = document.querySelector('#date-template').content.querySelector('p');
const chartTemplate = document.querySelector('#diagram-template').content.querySelector('p');

const localStore = new DataStorage();
const statistics = new Statistics({
  localStore,
  digitsTitle,
  totalResults,
  mentionsTitle,
  DAYS_ARR,
  createAnaliticsDate});

statistics.setDigitsTitle();
statistics.setTotalResults();
statistics.setMentionsTitle();
statistics.render({datesContainer, dateTemplate, chartsContainer, chartTemplate})
