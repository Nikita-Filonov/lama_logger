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
