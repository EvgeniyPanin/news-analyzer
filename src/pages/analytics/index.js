import './analytics.css';
import DataStorage from '../../js/modules/DataStorage';
import Statistics from '../../js/components/Statistics';
import {DAYS_ARR} from '../../js/constants/DAYS_ARR';

const digitsTitle = document.querySelector('.digits__title');
const totalResults = document.querySelector('.digits__week-digit');
const mentionsTitle = document.querySelector('.digits__title-digit');
const datesContainer = document.querySelector('#dates');
const chartsContainer = document.querySelector('#diagrams');
const dateItem = document.querySelector('.analytics__date');
const chartItem = document.querySelector('.analytics__diagram');

const localStore = new DataStorage();
const statistics = new Statistics({
  localStore,
  digitsTitle,
  totalResults,
  mentionsTitle,
  DAYS_ARR});

statistics.setDigitsTitle();
statistics.setTotalResults();
statistics.setMentionsTitle();
