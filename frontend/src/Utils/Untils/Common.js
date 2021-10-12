export const objectToQuery = async (object, ignore = ['meta']) =>
  object && '?' + Object.keys(object)
    .map(key => !ignore.includes(key) ? `${key}=${object[key]}&` : '')
    .join('');

export const copyText = (text) => {
  const el = document.createElement('input');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

