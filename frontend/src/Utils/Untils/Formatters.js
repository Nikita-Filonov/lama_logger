import moment from "moment";

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

  const contentType = responseHeaders['Content-Type']
  if (contentType?.startsWith('application/json')) {
    return 'json'
  }

  if (contentType?.startsWith('text/html')) {
    return 'html'
  }

  return 'text'
}

export const getTimeFiltersLabel = (filters) => {
  const intervalLabels = {prev: 'Last', next: 'Next'}
  if (filters?.type === 'interval') {
    const {amount, prev, unit} = filters?.interval;
    return `${intervalLabels[prev]} ${amount} ${amount > 1 ? unit : unit.slice(0, -1)}`;
  }

  if (filters?.type === 'range') {
    const start = moment(filters.range[0]).format('MMM D, HH:mm');
    const end = moment(filters.range[1]).format('MMM D, HH:mm');
    return `${start} to ${end}`;
  }
}