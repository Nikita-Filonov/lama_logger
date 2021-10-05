export const getStatusCodeColor = (statusCode) => {
  if (100 <= statusCode && statusCode <= 299) {
    return '#02C001'
  } else if (300 <= statusCode && statusCode <= 399) {
    return '#FFBD00'
  } else if (400 <= statusCode && statusCode <= 599) {
    return '#E40F08'
  }
}

export const successesByStatusCode = (statusCode, successes) => {
  if (100 <= statusCode && statusCode <= 299) {
    return successes.includes('success');
  }

  if (300 <= statusCode && statusCode <= 399) {
    return successes.includes('redirect');
  }

  if (400 <= statusCode && statusCode <= 599) {
    return successes.includes('error');
  }

  return false;
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
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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
