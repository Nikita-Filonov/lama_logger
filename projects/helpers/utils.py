import ast

from shlex import quote


def query_to_dict(query: dict, parse=False) -> dict:
    """Parse url query and makes dict from it"""
    if parse:
        return {field: ast.literal_eval(str(value)) for field, value in query.items()}

    return {field: str(value) for field, value in query.items()}


def to_curl(request, compressed=False, verify=True):
    """
    Returns string with curl command by provided request object
    Parameters
    ----------
    compressed : bool
        If `True` then `--compressed` argument will be added to result
        :param verify:
        :param compressed:
        :param request:
    """
    parts = [
        ('curl', None),
        ('-X', request.method),
    ]

    for k, v in sorted(request.headers.items()):
        parts += [('-H', '{0}: {1}'.format(k, v))]

    if request.body:
        body = request.body
        if isinstance(body, bytes):
            body = body.decode('utf-8')
        parts += [('-d', body)]

    if compressed:
        parts += [('--compressed', None)]

    if not verify:
        parts += [('--insecure', None)]

    parts += [(None, request.url)]

    flat_parts = []
    for k, v in parts:
        if k:
            flat_parts.append(quote(k))
        if v:
            flat_parts.append(quote(v))

    return ' '.join(flat_parts)
