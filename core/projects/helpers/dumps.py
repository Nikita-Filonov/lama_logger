DEFAULT_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
DEFAULT_STATUS_CODES = {
    'success': [100, 101, 200, 201, 202, 203, 204, 205, 206, 208, 226],
    'redirect': [300, 301, 302, 303, 304, 305, 306, 307, 308],
    'error': [400, 401, 402, 403, 404, 405, 406, 407, 408,
              409, 410, 411, 412, 413, 414, 415, 416, 418, 422,
              423, 424, 426, 428, 429, 431, 451, 500, 501, 502,
              503, 504, 505, 506, 507, 508, 509, 510, 511]
}
DEFAULT_HEADERS = {
    'keys': [
        'Content-Type',
        'Authorization',
        'Accept',
        'User-Agent',
        'Host'
    ],
    'values': [
        'application/json',
        'application/javascript',
        'application/zip',
        'application/gzip',
        'application/xml',
        'image/png',
        'image/jpeg',
        'multipart/form-data',
        'text/html',
        'text/javascript',
        'Token <value>',
        'Bearer <value>'
    ]
}

DEFAULT_PATTERNS = {
    '{int}': r'[0-9]+',
    '{uuid}': r'\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b',
    '{str}': r'([^>]*)'
}
