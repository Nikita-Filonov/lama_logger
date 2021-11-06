export const isDigit = (str) => /^\d+$/.test(str);
export const validateHttp = (value) => /(?:(?:https?|ftp):)?\/\//.test(value);
export const isValidJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
