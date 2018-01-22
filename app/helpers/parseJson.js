export default ( strObject, defaultValue ) => {
  try {
    return JSON.parse(strObject);
  } catch (err) {
    return defaultValue;
  }
}