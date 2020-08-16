import {ANALYTICS_MONTHS_ARR} from '../constants/ANALYTICS_MONTHS_ARR';

export const createMonth = (date) => {
  const month = new Date(date).getMonth();
  return ANALYTICS_MONTHS_ARR[month];
}
