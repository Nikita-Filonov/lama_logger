import moment from "moment";
import {CODES} from "../Constants";

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

  return {
    filters: JSON.stringify({
      method__in: filters?.methods,
      response_code__in: codes,
      created__range: filters?.time?.type === 'range'
        ? filters?.time?.range : getFilterInterval(filters?.time?.interval)
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
