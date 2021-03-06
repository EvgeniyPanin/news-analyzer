import {MONTH_ARR} from '../constants/MONTH_ARR';

export const buildCardDate = (data) => {
  const date = new Date(data);
  return `${date.getDate()} ${MONTH_ARR[date.getMonth()]}, ${date.getFullYear()}`
}
