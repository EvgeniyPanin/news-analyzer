import {DAYS_ARR} from '../constants/DAYS_ARR';

export const createAnaliticsDate = (date) => {
  return `${date.getDate()}, ${DAYS_ARR[date.getDay()]}`
}
