export const buildOneWeekAgoDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const year = date.getFullYear();
  const month = ((date.getMonth() + 1 + '').length === 1) ? '0' + ((date.getMonth() + 1)) : (date.getMonth() + 1);
  const day = date.getDate().length === 1 ? '0' + date.getDate() : date.getDate();
  return `${year}-${month}-${day}`
}
