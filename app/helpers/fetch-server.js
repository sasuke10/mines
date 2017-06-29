function requestError(error) {
  const status = { status: 'error' };
  if (!(error instanceof Response)) return Promise.reject({ ...status, message: error.message });

  return error.json().then(response => {
    if (isString(response.error)) return Promise.reject({ ...status, message: response.error });
    const message = Object.keys(response.error).map(key => `${ key }: ${ response.error[key] }`);

    return Promise.reject({ ...status, message });
  });
}

export function request({
  url,
  body,
  method = 'get',
  token = false,
  accept = 'text/plain,text/html,application/json',
  contentType = false,
} = {}) {
  const baseHeaders = { Accept: accept };
  const headersWithToken = token ? { ...baseHeaders, Authorization: `Token ${ token }` } : baseHeaders;
  const headersWithContentType = contentType ? { ...headersWithToken, 'Content-Type': contentType } : headersWithToken;
  const init = { method, headers: headersWithContentType };
  const options = ![ 'get', 'head' ].includes(method.toLowerCase()) ? { ...init, body } : init;

  return fetch(url, options).then(response =>
    response.ok ? response.json() : Promise.reject(response)
  ).catch(requestError);
}
