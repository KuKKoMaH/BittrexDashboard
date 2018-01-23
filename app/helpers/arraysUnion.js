export default ( compareCallback, ...arrays ) => {
  const result = [];
  const isInArray = newElem => !!result.find(elem => compareCallback(elem, newElem));
  arrays.forEach(( array ) => {
    if (!Array.isArray(array)) return;
    array.forEach(item => {
      if (!isInArray(item)) result.push(item);
    })
  });
  return result;
}