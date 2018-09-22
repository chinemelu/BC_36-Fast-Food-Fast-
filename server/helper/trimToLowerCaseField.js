const trimToLowerCaseField = (data, inputField) => {
  if (data[inputField] === undefined) {
    return '';
  }
  data[inputField] = data[inputField].trim().toLowerCase();
  return data[inputField];
};
export default trimToLowerCaseField;
