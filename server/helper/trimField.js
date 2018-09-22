/**
 * @function trimField
 */

const trimField = (data, inputField) => {
  /**
   * @description trims input field
   *
   * @param {Object} data http request body
   * @param {String} inputField input field
   *
   * @returns  {String} Returns a string
   */

  if (data[inputField] === undefined) {
    return '';
  }
  data[inputField] = data[inputField].trim();
  return data[inputField];
};

export default trimField;
