import {baseUrl} from "../Constants";

const client = async (
  endpoint: string,
  method: string,
  body: {},
  withAuth: boolean = true,
  customConfig: {} = {},
) => {
  const token = localStorage.getItem('token');
  let error = false;

  const headers = withAuth
    ? {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    : {'Content-Type': 'application/json'};

  const config = {
    method: method || 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body)
  }
  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (response.status === 401) {
    //logout()
    return
  }

  const json = await response.json();
  if (!response.ok) {
    error = true;
  }
  return {json, error};
}


export const get = async (endpoint: string, withAuth: boolean = true, customConfig: {} = {}) =>
  await client(endpoint, 'GET', null, withAuth, customConfig);
export const post = async (endpoint: string, body: {} = {}, withAuth: boolean = true, customConfig: {} = {}) =>
  await client(endpoint, 'POST', body, withAuth, customConfig);
export const patch = async (endpoint: string, body: {} = {}, withAuth: boolean = true, customConfig: {} = {}) =>
  await client(endpoint, 'PATCH', body, withAuth, customConfig);
export const remove = async (endpoint: string, body: {} = {}, withAuth: boolean = true, customConfig: {} = {}) =>
  await client(endpoint, 'DELETE', body, withAuth, customConfig);
