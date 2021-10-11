import _ from "lodash";
import {CODES} from "./Constants";
import moment from "moment";

export const getProjectName = ({match}) => JSON.parse(localStorage.getItem('project'))?.title

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


export const copyText = (text) => {
  const el = document.createElement('input');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


function descendingComparator(a, b, orderBy) {
  if (_.get(b, orderBy) < _.get(a, orderBy)) {
    return -1;
  }
  if (_.get(b, orderBy) > _.get(a, orderBy)) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const getFilterInterval = ({amount, unit, prev}) => {
  const now = moment(Date.now());
  const interval = prev === 'prev'
    ? now.subtract(amount, unit)
    : now.add(amount, unit)

  const formattedInterval = interval.format('YYYY-MM-DD HH:mm:ss');
  const formattedNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  return prev === 'prev' ? [formattedInterval, formattedNow] : [formattedNow, formattedInterval];
}

export const makeRequestsFilters = (filters) => {
  const codes = filters?.successes?.map(success => CODES[success]).flat();
  const interval = getFilterInterval(filters?.interval);
  console.log(interval)
  return {
    filters: JSON.stringify({
      method__in: filters?.methods,
      response_code__in: codes,
      created__range: interval
    })
  }
}

export const objectToQuery = async (object, ignore = ['meta']) =>
  object && '?' + Object.keys(object)
    .map(key => !ignore.includes(key) ? `${key}=${object[key]}&` : '')
    .join('');
