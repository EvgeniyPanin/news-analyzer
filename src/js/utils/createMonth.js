export const createMonth = (date) => {
  const MONTHS_ARR =[
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  const month = new Date(date).getMonth();
  return MONTHS_ARR[month];
}
