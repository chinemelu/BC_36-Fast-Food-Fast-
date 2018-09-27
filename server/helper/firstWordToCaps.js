// reference https://stackoverflow.com/questions/15150168/title-case-in-javascript-for-diacritics-non-ascii

const firstWordToCaps = (str) => {
  str = str.replace(/[^\s]+/g, word => word.replace(/^./, first => first.toUpperCase()));
  return str;
};

export default firstWordToCaps;
