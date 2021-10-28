import moment from "moment";

const getFilterInterval = ({amount, unit, prev}) => {
  const now = moment(Date.now());
  const interval = prev === 'prev'
    ? now.subtract(amount, unit)
    : now.add(amount, unit)

  const formattedInterval = interval.format('YYYY-MM-DD HH:mm:ss');
  const formattedNow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  return prev === 'prev' ? [formattedInterval, formattedNow] : [formattedNow, formattedInterval];
}

export const makeRequestsSearch = (search) => {
  return {
    search: JSON.stringify({
      requestUrl: search
    })
  }
}

export const makeRequestsFilters = (filters) => {
  const statusCodes = Object.values(filters?.statusCodes).flat()
    .sort((a, b) => a - b);
  const body = filters?.body;
  const headers = filters?.headers;

  const headersFilters = headers ? {requestHeaders__contains: headers, responseHeaders__contains: headers} : {};
  const bodyFilters = (body?.responseBody || body?.requestBody) ? {
    responseBody__contains: body?.responseBody,
    requestBody__contains: body?.requestBody
  } : {};
  const domainFilters = filters?.domain ? {requestUrl__icontains: filters?.domain} : {};

  return {
    filters: JSON.stringify({
      method__in: filters?.methods,
      statusCode__in: statusCodes,
      created__range: filters?.time?.type === 'range'
        ? filters?.time?.range : getFilterInterval(filters?.time?.interval),
      ...bodyFilters,
      ...domainFilters,
      ...headersFilters,
    })
  }
}

export const makeRequestsStatsFilters = (filters) => {
  return {
    filters: JSON.stringify({
      created__range: filters?.time?.range
    })
  }
}
