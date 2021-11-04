export const isDigit = (str) => /^\d+$/.test(str);
export const validateHttp = (value) => /(?:(?:https?|ftp):)?\/\//.test(value);
