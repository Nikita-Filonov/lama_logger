import moment from "moment";
import {parseQueryFromUrl} from "./Common";

export const getStatusCodeColor = (statusCode) => {
  if (100 <= statusCode && statusCode <= 299) {
    return '#02C001'
  } else if (300 <= statusCode && statusCode <= 399) {
    return '#FFBD00'
  } else if (400 <= statusCode && statusCode <= 599) {
    return '#E40F08'
  }
}

export const bodyTypeDetect = (responseHeaders, body = null) => {
  if (body === null) {
    return 'text'
  }

  let key, keys = Object.keys(responseHeaders);
  let n = keys.length;
  const lowerResponseHeaders = {};
  while (n--) {
    key = keys[n];
    lowerResponseHeaders[key.toLowerCase()] = responseHeaders[key];
  }
  const contentType = lowerResponseHeaders['content-type'];
  if (contentType?.startsWith('application/json')) {
    return 'json'
  }

  if (contentType?.startsWith('text/html')) {
    return 'html'
  }

  return 'text'
}

export const getTimeFiltersLabel = (filters) => {
  if (filters?.type === 'interval') {
    const intervalLabels = {prev: 'Last', next: 'Next'};
    const {amount, prev, unit} = filters?.interval;
    return `${intervalLabels[prev]} ${amount} ${amount > 1 ? unit : unit.slice(0, -1)}`;
  }

  if (filters?.type === 'range') {
    const start = moment(filters.range[0]).format('MMM D, HH:mm');
    const end = moment(filters.range[1]).format('MMM D, HH:mm');
    return `${start} to ${end}`;
  }
  return 'Time filters'
}

export const toCalendarWithoutTime = (date) =>
  moment(date).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'L'
  })

export const requestToCustomRequest = async (request) => {
  const requestHeaders = Object.keys(request?.requestHeaders).map(key => ({
    key: key,
    value: request?.requestHeaders[key],
    include: true
  }));
  const queryObject = await parseQueryFromUrl(request?.requestUrl);
  const queryParams = Object.keys(queryObject).map(key => ({key: key, value: queryObject[key], include: true}));
  return {
    requestUrl: request?.requestUrl,
    requestHeaders,
    queryParams,
    requestBody: request?.requestBody,
    method: request?.method,
    isCustom: true
  };
}
