/**
 *
 * @param {String} dateStr - eg "2018-01-13T15:37:39.42"
 */
export const convertDate = (dateStr) => {
  const [date, time] = dateStr.split('T');
  const [year,month,day] = date.split('-');
  const [hours,minutes] = time.split(':');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};