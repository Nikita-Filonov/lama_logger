import moment from "moment";
import {isValidJson} from "./Validators";

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
  const headers = {};
  for (let i = 0; i < filters?.headers?.length; i++) {
    const key = filters?.headers[i].key;
    const value = filters?.headers[i].value;
    if (key && value) {
      headers[key] = value;
    }
  }

  const headersFilters = {requestHeaders__contains: headers};
  const responseBodyFilters = body?.responseBody ? {responseBody__contains: body?.responseBody} : {};
  const requestBodyFilters = body?.requestBody ? {requestBody__contains: body?.requestBody} : {}
  const domainFilters = filters?.domain ? {requestUrl__icontains: filters?.domain} : {};

  return {
    filters: JSON.stringify({
      method__in: filters?.methods,
      statusCode__in: statusCodes,
      created__range: filters?.time?.type === 'range'
        ? filters?.time?.range : getFilterInterval(filters?.time?.interval),
      ...domainFilters,
      ...headersFilters,
      ...requestBodyFilters,
      ...responseBodyFilters,
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

export const parsePastedValue = async (event) => {
  let result = event.clipboardData.getData('Text');
  let isJson = false;
  if (isValidJson(result)) {
    const pastedJson = JSON.parse(result);
    result = Object.keys(pastedJson).map(key => ({key: key, value: pastedJson[key], include: true}));
    isJson = true;
  }
  return {result, isJson};
}
