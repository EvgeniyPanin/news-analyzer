import './analytics.css';
import DataStorage from '../../js/modules/DataStorage';
import Statistics from '../../js/components/Statistics';

const digitsTitle = document.querySelector('.digits__title');
const totalResults = document.querySelector('.digits__week-digit');
const mentionsTitle = document.querySelector('.digits__title-digit');
const localStore = new DataStorage();
const statistics = new Statistics({
  localStore,
  digitsTitle,
  totalResults,
  mentionsTitle});

statistics.setDigitsTitle();
statistics.setTotalResults();
statistics.setMentionsTitle();
