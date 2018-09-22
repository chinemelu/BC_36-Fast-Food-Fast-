const trimField = (data, inputField) => {
  if (data[inputField] === undefined) {
    return '';
  }
  data[inputField] = data[inputField].trim();
  return data[inputField];
};

export default trimField;
