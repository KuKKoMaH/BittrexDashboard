/**
 *
 * @param {String} dateStr - eg "2018-01-13T15:37:39.42"
 * @return {String} DD.MM.YYYY HH:MM
 */
export const convertDate = ( dateStr ) => {
  const [date, time] = dateStr.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

/**
 *
 * @param {String} dateStr - eg "1/10/2018 3:48:05 PM"
 * @return {String} DD.MM.YYYY HH:MM
 */
export const convertUSADate = ( dateStr ) => convertDate(new Date(dateStr).toISOString());

export const dateToStr = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};