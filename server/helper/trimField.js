/**
 * @function trimField
 */
/**
   * @description trims input field
   *
   * @param {Object} data http request body
   * @param {String} inputField input field
   *
   * @returns  {String} Returns a string
   */
const trimField = (data, inputField) => {
  if (data[inputField] === undefined) {
    return '';
  }
  data[inputField] = data[inputField].trim();
  return data[inputField];
};

export default trimField;
