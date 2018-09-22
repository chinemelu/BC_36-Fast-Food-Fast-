/**
 * @function trimToLowerCaseField
 */

const trimToLowerCaseField = (data, inputField) => {
  /**
   * @description trims and converts input field to lowercase
   *
   * @param {Object} data http request body
   * @param {String} inputField input field
   *
   * @returns  {String} Returns a string
   */

  if (data[inputField] === undefined) {
    return '';
  }
  data[inputField] = data[inputField].trim().toLowerCase();
  return data[inputField];
};
export default trimToLowerCaseField;
