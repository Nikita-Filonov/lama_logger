import React, {forwardRef} from "react";
import {Slide} from "@mui/material";

export const uuid4 = async () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";
export const normalizeAmount = async (unit, amount) => {
  if (unit === 'seconds') {
    return amount;
  }

  if (unit === 'minutes') {
    return amount * 60;
  }
  if (unit === 'hours') {
    return amount * 60 * 60;
  }
  if (unit === 'days') {
    return amount * 60 * 60 * 24;
  }
  if (unit === 'months') {
    return amount * 60 * 60 * 24 * 30
  }

  return amount;
}

export const objectToQuery = async (object, ignore = ['meta']) =>
  object && '?' + Object.keys(object)
    .map(key => !ignore.includes(key) ? `${key}=${object[key]}&` : '')
    .join('');

export const queryWithPagination = async (filters, limit, offset, key) => {
  const queryPayload = {
    ...filters,
    limit: limit || localStorage.getItem(`rowsPerPage${key}`),
    offset: offset || 0
  }
  return await objectToQuery(queryPayload);
}

export const copyText = (text) => {
  const el = document.createElement('input');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export const SlideTransition = forwardRef((props, ref) =>
  <Slide direction="up" ref={ref} {...props} />);

export const parseQueryFromUrl = async (url: string) => {
  if (!url) {
    return [];
  }
  const queryParams = url.split('?')[1];
  const urlSearchParams = new URLSearchParams(queryParams);
  return Object.fromEntries(urlSearchParams.entries());
}
